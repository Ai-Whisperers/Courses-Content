// app.js - Logica del Catalogo Grocery Paraguay
// Demo FPUNA 2026 - JavaScript Vanilla

// ==================== REFERENCIAS DOM ====================
const filtroCategoria = document.getElementById('filtro-categoria');
const filtroBusqueda = document.getElementById('filtro-busqueda');
const filtroImagen = document.getElementById('filtro-imagen');
const filtroOrden = document.getElementById('filtro-orden');
const btnLimpiar = document.getElementById('btn-limpiar');
const btnVista = document.getElementById('btn-vista');
const iconoVista = document.getElementById('icono-vista');
const productosGrid = document.getElementById('productos-grid');
const estadoVacio = document.getElementById('estado-vacio');
const contadorActual = document.getElementById('contador-actual');
const contadorTotal = document.getElementById('contador-total');

// ==================== ESTADO DE LA APP ====================
let vistaActual = localStorage.getItem('vistaGrocery') || 'grid';

// ==================== INICIALIZACION ====================

/**
 * Inicializa la aplicacion al cargar la pagina
 */
function inicializar() {
  poblarCategorias();
  aplicarVista(vistaActual);
  aplicarFiltros();
  agregarEventListeners();
}

/**
 * Llena el dropdown de categorias con las categorias unicas del catalogo
 */
function poblarCategorias() {
  categorias.forEach(categoria => {
    const option = document.createElement('option');
    option.value = categoria;
    option.textContent = categoria;
    filtroCategoria.appendChild(option);
  });
}

// ==================== FILTRADO Y ORDENAMIENTO ====================

/**
 * Filtra los productos segun los criterios activos
 * @returns {Array} Productos filtrados
 */
function filtrarProductos() {
  const categoriaSeleccionada = filtroCategoria.value;
  const textoBusqueda = filtroBusqueda.value.toLowerCase().trim();
  const soloConImagen = filtroImagen.checked;

  return productos.filter(producto => {
    // Filtro por categoria
    if (categoriaSeleccionada !== 'todas' && producto.categoria !== categoriaSeleccionada) {
      return false;
    }

    // Filtro por texto (nombre o descripcion)
    if (textoBusqueda) {
      const coincideNombre = producto.nombre.toLowerCase().includes(textoBusqueda);
      const coincideDescripcion = producto.descripcion.toLowerCase().includes(textoBusqueda);
      if (!coincideNombre && !coincideDescripcion) {
        return false;
      }
    }

    // Filtro por imagen
    if (soloConImagen && !producto.imagen) {
      return false;
    }

    return true;
  });
}

/**
 * Ordena una lista de productos
 * @param {Array} lista - Productos a ordenar
 * @param {string} orden - 'az' o 'za'
 * @returns {Array} Productos ordenados
 */
function ordenarProductos(lista, orden) {
  return [...lista].sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();
    
    if (orden === 'az') {
      return nombreA.localeCompare(nombreB, 'es');
    } else {
      return nombreB.localeCompare(nombreA, 'es');
    }
  });
}

/**
 * Aplica todos los filtros, ordena y renderiza
 */
function aplicarFiltros() {
  const productosFiltrados = filtrarProductos();
  const productosOrdenados = ordenarProductos(productosFiltrados, filtroOrden.value);
  
  renderizarProductos(productosOrdenados);
  actualizarContador(productosOrdenados.length);
}

// ==================== RENDERIZADO ====================

/**
 * Renderiza la lista de productos en el grid
 * @param {Array} lista - Productos a mostrar
 */
function renderizarProductos(lista) {
  if (lista.length === 0) {
    productosGrid.innerHTML = '';
    estadoVacio.style.display = 'block';
    return;
  }

  estadoVacio.style.display = 'none';
  productosGrid.innerHTML = lista.map(crearCardProducto).join('');
}

/**
 * Crea el HTML para una card de producto
 * @param {Object} producto - Datos del producto
 * @returns {string} HTML de la card
 */
function crearCardProducto(producto) {
  const imagenHTML = producto.imagen
    ? `<img src="${producto.imagen}" alt="${producto.nombre}" class="producto-card__imagen" loading="lazy" onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';">
       <div class="producto-card__placeholder" style="display: none;">📦</div>`
    : `<div class="producto-card__placeholder">📦</div>`;

  return `
    <article class="producto-card" data-id="${producto.id}">
      <div class="producto-card__media">
        ${imagenHTML}
      </div>
      <div class="producto-card__contenido">
        <h3 class="producto-card__nombre">${producto.nombre}</h3>
        <p class="producto-card__descripcion">${producto.descripcion}</p>
        <div class="producto-card__meta">
          <span class="producto-card__categoria">${producto.categoria}</span>
          <span class="producto-card__unidad">${producto.unidadCompra}</span>
        </div>
      </div>
    </article>
  `;
}

/**
 * Actualiza el contador de productos mostrados
 * @param {number} actual - Cantidad de productos filtrados
 */
function actualizarContador(actual) {
  contadorActual.textContent = actual;
  contadorTotal.textContent = productos.length;
}

// ==================== VISTA GRID/LISTA ====================

/**
 * Aplica la vista seleccionada (grid o lista)
 * @param {string} vista - 'grid' o 'lista'
 */
function aplicarVista(vista) {
  vistaActual = vista;
  localStorage.setItem('vistaGrocery', vista);

  if (vista === 'lista') {
    productosGrid.classList.add('vista-lista');
    iconoVista.textContent = '▦';
    btnVista.title = 'Cambiar a vista grid';
  } else {
    productosGrid.classList.remove('vista-lista');
    iconoVista.textContent = '☰';
    btnVista.title = 'Cambiar a vista lista';
  }
}

/**
 * Alterna entre vista grid y lista
 */
function toggleVista() {
  const nuevaVista = vistaActual === 'grid' ? 'lista' : 'grid';
  aplicarVista(nuevaVista);
}

// ==================== LIMPIAR FILTROS ====================

/**
 * Resetea todos los filtros a sus valores por defecto
 */
function limpiarFiltros() {
  filtroCategoria.value = 'todas';
  filtroBusqueda.value = '';
  filtroImagen.checked = false;
  filtroOrden.value = 'az';
  aplicarFiltros();
}

// ==================== EVENT LISTENERS ====================

/**
 * Agrega los event listeners a los controles
 */
function agregarEventListeners() {
  // Filtros
  filtroCategoria.addEventListener('change', aplicarFiltros);
  filtroOrden.addEventListener('change', aplicarFiltros);
  filtroImagen.addEventListener('change', aplicarFiltros);
  
  // Busqueda con debounce para mejor rendimiento
  let timeoutBusqueda;
  filtroBusqueda.addEventListener('input', () => {
    clearTimeout(timeoutBusqueda);
    timeoutBusqueda = setTimeout(aplicarFiltros, 300);
  });

  // Botones
  btnLimpiar.addEventListener('click', limpiarFiltros);
  btnVista.addEventListener('click', toggleVista);
}

// ==================== ARRANQUE ====================
document.addEventListener('DOMContentLoaded', inicializar);
