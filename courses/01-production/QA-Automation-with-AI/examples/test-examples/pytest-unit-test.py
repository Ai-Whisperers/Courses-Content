"""
Example: pytest Unit Tests with AI-Assisted Generation

This file demonstrates production-quality pytest tests generated with AI assistance.
Use this as a reference for test structure, fixtures, and best practices.
"""

import pytest
from datetime import datetime, timedelta
from unittest.mock import Mock, patch, AsyncMock
from decimal import Decimal


# ============================================
# Code Under Test
# ============================================

class ProductService:
    """Service for managing products in an e-commerce system."""

    def __init__(self, db_session, cache_service, search_service):
        self.db = db_session
        self.cache = cache_service
        self.search = search_service

    async def create_product(self, data: dict) -> dict:
        """Create a new product."""
        # Validation
        if not data.get('name'):
            raise ValueError('Product name is required')

        if not data.get('price') or data['price'] <= 0:
            raise ValueError('Price must be positive')

        if len(data.get('name', '')) > 200:
            raise ValueError('Product name too long')

        # Check for duplicate SKU
        if data.get('sku'):
            existing = await self.db.products.find_one({'sku': data['sku']})
            if existing:
                raise ValueError(f"SKU {data['sku']} already exists")

        # Create product
        product = {
            'name': data['name'],
            'price': Decimal(str(data['price'])),
            'sku': data.get('sku'),
            'description': data.get('description', ''),
            'category': data.get('category', 'uncategorized'),
            'stock': data.get('stock', 0),
            'active': True,
            'created_at': datetime.utcnow(),
        }

        result = await self.db.products.insert_one(product)
        product['id'] = str(result.inserted_id)

        # Invalidate cache
        await self.cache.delete('products:all')

        # Index in search
        await self.search.index('products', product)

        return product

    async def get_product(self, product_id: str) -> dict:
        """Get product by ID."""
        if not product_id:
            raise ValueError('Product ID is required')

        # Check cache first
        cached = await self.cache.get(f'product:{product_id}')
        if cached:
            return cached

        # Get from database
        product = await self.db.products.find_one({'_id': product_id})
        if not product:
            raise ValueError('Product not found')

        # Cache for 1 hour
        await self.cache.set(f'product:{product_id}', product, ttl=3600)

        return product

    async def update_stock(self, product_id: str, quantity: int) -> dict:
        """Update product stock. Quantity can be negative for decrements."""
        product = await self.get_product(product_id)

        new_stock = product['stock'] + quantity
        if new_stock < 0:
            raise ValueError('Insufficient stock')

        await self.db.products.update_one(
            {'_id': product_id},
            {'$set': {'stock': new_stock}}
        )

        # Invalidate cache
        await self.cache.delete(f'product:{product_id}')

        product['stock'] = new_stock
        return product

    def calculate_discount(self, price: Decimal, discount_percent: int) -> Decimal:
        """Calculate discounted price."""
        if discount_percent < 0 or discount_percent > 100:
            raise ValueError('Discount must be between 0 and 100')

        discount = price * (Decimal(discount_percent) / 100)
        return (price - discount).quantize(Decimal('0.01'))


# ============================================
# Fixtures
# ============================================

@pytest.fixture
def mock_db():
    """Create mock database session."""
    db = Mock()
    db.products = AsyncMock()
    return db


@pytest.fixture
def mock_cache():
    """Create mock cache service."""
    cache = AsyncMock()
    cache.get.return_value = None  # Default to cache miss
    return cache


@pytest.fixture
def mock_search():
    """Create mock search service."""
    return AsyncMock()


@pytest.fixture
def product_service(mock_db, mock_cache, mock_search):
    """Create ProductService with mocked dependencies."""
    return ProductService(mock_db, mock_cache, mock_search)


@pytest.fixture
def sample_product_data():
    """Sample product data for testing."""
    return {
        'name': 'Test Product',
        'price': 29.99,
        'sku': 'TEST-001',
        'description': 'A test product',
        'category': 'electronics',
        'stock': 100
    }


@pytest.fixture
def sample_product():
    """Sample product as returned from database."""
    return {
        'id': '12345',
        'name': 'Test Product',
        'price': Decimal('29.99'),
        'sku': 'TEST-001',
        'description': 'A test product',
        'category': 'electronics',
        'stock': 100,
        'active': True,
        'created_at': datetime.utcnow()
    }


# ============================================
# Tests: create_product
# ============================================

class TestCreateProduct:
    """Tests for ProductService.create_product()"""

    @pytest.mark.asyncio
    async def test_creates_product_with_valid_data(
        self, product_service, mock_db, sample_product_data
    ):
        """Should create product and return it with ID."""
        # Arrange
        mock_db.products.find_one.return_value = None  # No duplicate
        mock_db.products.insert_one.return_value = Mock(inserted_id='new-id')

        # Act
        result = await product_service.create_product(sample_product_data)

        # Assert
        assert result['id'] == 'new-id'
        assert result['name'] == 'Test Product'
        assert result['price'] == Decimal('29.99')
        assert result['active'] is True
        assert 'created_at' in result

    @pytest.mark.asyncio
    async def test_raises_error_for_missing_name(
        self, product_service, sample_product_data
    ):
        """Should raise ValueError when name is missing."""
        # Arrange
        del sample_product_data['name']

        # Act & Assert
        with pytest.raises(ValueError) as exc_info:
            await product_service.create_product(sample_product_data)

        assert str(exc_info.value) == 'Product name is required'

    @pytest.mark.asyncio
    async def test_raises_error_for_invalid_price(self, product_service):
        """Should raise ValueError for zero or negative price."""
        # Test zero price
        with pytest.raises(ValueError) as exc_info:
            await product_service.create_product({'name': 'Test', 'price': 0})
        assert 'Price must be positive' in str(exc_info.value)

        # Test negative price
        with pytest.raises(ValueError):
            await product_service.create_product({'name': 'Test', 'price': -10})

    @pytest.mark.asyncio
    async def test_raises_error_for_long_name(self, product_service):
        """Should raise ValueError when name exceeds 200 characters."""
        # Arrange
        long_name = 'x' * 201

        # Act & Assert
        with pytest.raises(ValueError) as exc_info:
            await product_service.create_product({
                'name': long_name,
                'price': 10
            })

        assert 'too long' in str(exc_info.value)

    @pytest.mark.asyncio
    async def test_raises_error_for_duplicate_sku(
        self, product_service, mock_db, sample_product_data
    ):
        """Should raise ValueError when SKU already exists."""
        # Arrange
        mock_db.products.find_one.return_value = {'sku': 'TEST-001'}

        # Act & Assert
        with pytest.raises(ValueError) as exc_info:
            await product_service.create_product(sample_product_data)

        assert 'TEST-001 already exists' in str(exc_info.value)

    @pytest.mark.asyncio
    async def test_invalidates_cache_after_creation(
        self, product_service, mock_db, mock_cache, sample_product_data
    ):
        """Should invalidate products cache after creating product."""
        # Arrange
        mock_db.products.find_one.return_value = None
        mock_db.products.insert_one.return_value = Mock(inserted_id='id')

        # Act
        await product_service.create_product(sample_product_data)

        # Assert
        mock_cache.delete.assert_called_with('products:all')

    @pytest.mark.asyncio
    async def test_indexes_product_in_search(
        self, product_service, mock_db, mock_search, sample_product_data
    ):
        """Should index created product in search service."""
        # Arrange
        mock_db.products.find_one.return_value = None
        mock_db.products.insert_one.return_value = Mock(inserted_id='id')

        # Act
        result = await product_service.create_product(sample_product_data)

        # Assert
        mock_search.index.assert_called_once_with('products', result)

    @pytest.mark.asyncio
    async def test_uses_default_values(self, product_service, mock_db):
        """Should use default values for optional fields."""
        # Arrange
        mock_db.products.find_one.return_value = None
        mock_db.products.insert_one.return_value = Mock(inserted_id='id')

        # Act
        result = await product_service.create_product({
            'name': 'Minimal Product',
            'price': 10
        })

        # Assert
        assert result['description'] == ''
        assert result['category'] == 'uncategorized'
        assert result['stock'] == 0


# ============================================
# Tests: get_product
# ============================================

class TestGetProduct:
    """Tests for ProductService.get_product()"""

    @pytest.mark.asyncio
    async def test_returns_cached_product(
        self, product_service, mock_cache, sample_product
    ):
        """Should return product from cache if available."""
        # Arrange
        mock_cache.get.return_value = sample_product

        # Act
        result = await product_service.get_product('12345')

        # Assert
        assert result == sample_product
        mock_cache.get.assert_called_once_with('product:12345')

    @pytest.mark.asyncio
    async def test_fetches_from_db_on_cache_miss(
        self, product_service, mock_db, mock_cache, sample_product
    ):
        """Should fetch from database when cache misses."""
        # Arrange
        mock_cache.get.return_value = None
        mock_db.products.find_one.return_value = sample_product

        # Act
        result = await product_service.get_product('12345')

        # Assert
        assert result == sample_product
        mock_db.products.find_one.assert_called_once()

    @pytest.mark.asyncio
    async def test_caches_product_after_fetch(
        self, product_service, mock_db, mock_cache, sample_product
    ):
        """Should cache product for 1 hour after fetching from DB."""
        # Arrange
        mock_cache.get.return_value = None
        mock_db.products.find_one.return_value = sample_product

        # Act
        await product_service.get_product('12345')

        # Assert
        mock_cache.set.assert_called_once_with(
            'product:12345',
            sample_product,
            ttl=3600
        )

    @pytest.mark.asyncio
    async def test_raises_error_for_missing_id(self, product_service):
        """Should raise ValueError when ID is not provided."""
        with pytest.raises(ValueError) as exc_info:
            await product_service.get_product('')

        assert 'Product ID is required' in str(exc_info.value)

    @pytest.mark.asyncio
    async def test_raises_error_for_nonexistent_product(
        self, product_service, mock_db, mock_cache
    ):
        """Should raise ValueError when product not found."""
        # Arrange
        mock_cache.get.return_value = None
        mock_db.products.find_one.return_value = None

        # Act & Assert
        with pytest.raises(ValueError) as exc_info:
            await product_service.get_product('nonexistent')

        assert 'Product not found' in str(exc_info.value)


# ============================================
# Tests: update_stock
# ============================================

class TestUpdateStock:
    """Tests for ProductService.update_stock()"""

    @pytest.mark.asyncio
    async def test_increments_stock(
        self, product_service, mock_db, mock_cache, sample_product
    ):
        """Should increase stock by specified quantity."""
        # Arrange
        mock_cache.get.return_value = sample_product

        # Act
        result = await product_service.update_stock('12345', 50)

        # Assert
        assert result['stock'] == 150  # 100 + 50
        mock_db.products.update_one.assert_called_once()

    @pytest.mark.asyncio
    async def test_decrements_stock(
        self, product_service, mock_db, mock_cache, sample_product
    ):
        """Should decrease stock by specified quantity."""
        # Arrange
        mock_cache.get.return_value = sample_product

        # Act
        result = await product_service.update_stock('12345', -30)

        # Assert
        assert result['stock'] == 70  # 100 - 30

    @pytest.mark.asyncio
    async def test_raises_error_for_insufficient_stock(
        self, product_service, mock_cache, sample_product
    ):
        """Should raise ValueError when decrement exceeds stock."""
        # Arrange
        mock_cache.get.return_value = sample_product

        # Act & Assert
        with pytest.raises(ValueError) as exc_info:
            await product_service.update_stock('12345', -150)

        assert 'Insufficient stock' in str(exc_info.value)

    @pytest.mark.asyncio
    async def test_invalidates_cache_after_update(
        self, product_service, mock_db, mock_cache, sample_product
    ):
        """Should invalidate product cache after stock update."""
        # Arrange
        mock_cache.get.return_value = sample_product

        # Act
        await product_service.update_stock('12345', 10)

        # Assert
        mock_cache.delete.assert_called_with('product:12345')


# ============================================
# Tests: calculate_discount
# ============================================

class TestCalculateDiscount:
    """Tests for ProductService.calculate_discount()"""

    def test_calculates_correct_discount(self, product_service):
        """Should calculate correct discounted price."""
        # Arrange
        price = Decimal('100.00')

        # Act
        result = product_service.calculate_discount(price, 20)

        # Assert
        assert result == Decimal('80.00')

    def test_handles_zero_discount(self, product_service):
        """Should return original price for zero discount."""
        price = Decimal('50.00')
        result = product_service.calculate_discount(price, 0)
        assert result == Decimal('50.00')

    def test_handles_full_discount(self, product_service):
        """Should return zero for 100% discount."""
        price = Decimal('50.00')
        result = product_service.calculate_discount(price, 100)
        assert result == Decimal('0.00')

    def test_rounds_to_two_decimal_places(self, product_service):
        """Should round result to 2 decimal places."""
        price = Decimal('33.33')
        result = product_service.calculate_discount(price, 15)
        assert result == Decimal('28.33')

    def test_raises_error_for_negative_discount(self, product_service):
        """Should raise ValueError for negative discount."""
        with pytest.raises(ValueError) as exc_info:
            product_service.calculate_discount(Decimal('100'), -10)

        assert 'between 0 and 100' in str(exc_info.value)

    def test_raises_error_for_over_100_discount(self, product_service):
        """Should raise ValueError for discount over 100%."""
        with pytest.raises(ValueError):
            product_service.calculate_discount(Decimal('100'), 101)

    @pytest.mark.parametrize('price,discount,expected', [
        (Decimal('100.00'), 10, Decimal('90.00')),
        (Decimal('50.00'), 25, Decimal('37.50')),
        (Decimal('75.99'), 50, Decimal('38.00')),
        (Decimal('199.99'), 33, Decimal('134.00')),
    ])
    def test_various_discount_scenarios(
        self, product_service, price, discount, expected
    ):
        """Should handle various discount calculations correctly."""
        result = product_service.calculate_discount(price, discount)
        assert result == expected


# ============================================
# Run tests
# ============================================

if __name__ == '__main__':
    pytest.main([__file__, '-v', '--cov=.', '--cov-report=term-missing'])
