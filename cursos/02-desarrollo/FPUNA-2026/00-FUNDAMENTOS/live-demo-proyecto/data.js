// data.js - Catalogo de productos Grocery Paraguay
// Fuente: https://github.com/IvanWeissVanDerPol/grocery

const productos = [
  // ==================== CARNES: RES ====================
  { id: 1, nombre: "Costillar", descripcion: "Arqueado, hueso angosto, buena grasa blanca", unidadCompra: "Pieza entera (8-10 kg) o Tiras anchas (3-4 kg)", categoria: "Carnes: Res", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/costillar_raw_1767901103232.png" },
  { id: 2, nombre: "Vacío", descripcion: "Carne roja intensa, membrana intacta", unidadCompra: "Pieza entera (2-3 kg)", categoria: "Carnes: Res", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/vacio_raw_1767901134699.png" },
  { id: 3, nombre: "Entraña", descripcion: "Fina, sin piel si es posible", unidadCompra: "Paquete x 2-3 un (1.5 kg)", categoria: "Carnes: Res", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/entrana_raw_1767901149657.png" },
  { id: 4, nombre: "Tira de Asado", descripcion: "Corte banderita o tradicional ancha, hueso chico", unidadCompra: "Tiras de 5cm (3 kg)", categoria: "Carnes: Res", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/tira_de_asado_raw_1767901118630.png" },
  { id: 5, nombre: "Lomo", descripcion: "Limpio, sin cordón", unidadCompra: "Pieza entera (1.5 - 2 kg)", categoria: "Carnes: Res", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/lomo_raw_1767901232257.png" },
  { id: 6, nombre: "Bife de Chorizo", descripcion: "Con grasa lateral justa (1cm)", unidadCompra: "Pieza entera o churrascos gruesos (2 kg)", categoria: "Carnes: Res", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/bife_de_chorizo_raw_1767901164253.png" },
  { id: 7, nombre: "Ojo de Bife", descripcion: "Marmoleado intenso, ojo de grasa central", unidadCompra: "Pieza entera o bifes anchos (2kg)", categoria: "Carnes: Res", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/ojo_de_bife_raw_1767901189358.png" },
  { id: 8, nombre: "Picanha", descripcion: "Triangular, capa de grasa blanca gruesa superior", unidadCompra: "Pieza entera (1.5 kg)", categoria: "Carnes: Res", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/picanha_raw_1767901217990.png" },
  { id: 9, nombre: "Matambre", descripcion: "Rosado parejo, grasa fina", unidadCompra: "Pieza entera (1.5 - 2 kg)", categoria: "Carnes: Res", imagen: null },
  { id: 10, nombre: "Osobuco", descripcion: "Rodajas gruesas con caracú grande", unidadCompra: "2-3 kg (cortado)", categoria: "Carnes: Res", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/osobuco_raw_1767901247243.png" },
  { id: 11, nombre: "Aguja / Paleta", descripcion: "Sin nervios excesivos, buena para picar o estofado", unidadCompra: "Trozos de 1 kg", categoria: "Carnes: Res", imagen: null },
  { id: 12, nombre: "Falda", descripcion: "Con hueso, buena carne", unidadCompra: "Tira entera (2 kg)", categoria: "Carnes: Res", imagen: null },
  { id: 13, nombre: "Garrón", descripcion: "Para caldo/hervido", unidadCompra: "Pieza entera (1-2 kg)", categoria: "Carnes: Res", imagen: null },
  { id: 14, nombre: "Carne Molida", descripcion: "De primera (picada en el momento)", unidadCompra: "1 kg", categoria: "Carnes: Res", imagen: null },

  // ==================== CARNES: CERDO ====================
  { id: 15, nombre: "Costilla de Cerdo", descripcion: "Hueso pequeño, carne rosada", unidadCompra: "Tira entera o troceada (3 kg)", categoria: "Carnes: Cerdo", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/costilla_cerdo_raw_1767901555126.png" },
  { id: 16, nombre: "Panceta (Tocino)", descripcion: "Fresca (cruda), plancha entera con piel", unidadCompra: "Plancha entera (3-4 kg)", categoria: "Carnes: Cerdo", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/panceta_cerdo_raw_1767901568241.png" },
  { id: 17, nombre: "Bondiola", descripcion: "Veteada, color intenso", unidadCompra: "Pieza entera (2 kg)", categoria: "Carnes: Cerdo", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/bondiola_raw_1767901583239.png" },
  { id: 18, nombre: "Matambrito de Cerdo", descripcion: "Fino, grasa blanca", unidadCompra: "1-2 kg", categoria: "Carnes: Cerdo", imagen: null },
  { id: 19, nombre: "Lechón", descripcion: "Entero o mitad (según pedido)", unidadCompra: "Mitad (4-6 kg)", categoria: "Carnes: Cerdo", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/lechon_mitad_raw_1767901614665.png" },
  { id: 20, nombre: "Pata / Codillo", descripcion: "Fresco, con piel", unidadCompra: "2 unidades", categoria: "Carnes: Cerdo", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/codillo_cerdo_raw_1767901629755.png" },
  { id: 21, nombre: "Chuleta de Cerdo", descripcion: "Corte grueso", unidadCompra: "2 kg", categoria: "Carnes: Cerdo", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/chuleta_cerdo_raw_1767901643104.png" },

  // ==================== PEQUEÑOS ANIMALES ====================
  { id: 22, nombre: "Pollo Casero", descripcion: "Piel amarilla, criado a maíz", unidadCompra: "Entero (2-3 un)", categoria: "Pequeños Animales", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/pollo_casero_raw_1767901683573.png" },
  { id: 23, nombre: "Pollo Industrial", descripcion: "Pechuga grande, fresco (no congelado)", unidadCompra: "Entero (2-3 un)", categoria: "Pequeños Animales", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/pollo_industrial_raw_1767901697605.png" },
  { id: 24, nombre: "Gallina", descripcion: "Dura, para caldo", unidadCompra: "Entera (1 un)", categoria: "Pequeños Animales", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/gallina_raw_1767901711215.png" },
  { id: 25, nombre: "Pato", descripcion: "Entero, con piel", unidadCompra: "Entero (1 un)", categoria: "Pequeños Animales", imagen: "https://raw.githubusercontent.com/IvanWeissVanDerPol/grocery/main/02_Shopping_Guide/images/pato_crudo_raw_1767901725210.png" },
  { id: 26, nombre: "Conejo", descripcion: "Faenado limpio", unidadCompra: "Entero (1 un)", categoria: "Pequeños Animales", imagen: null },
  { id: 27, nombre: "Cabra", descripcion: "Entero sin piel, olor suave", unidadCompra: "Entero (5-8 kg)", categoria: "Pequeños Animales", imagen: null },
  { id: 28, nombre: "Cordero", descripcion: "Entero sin piel, grasa blanca firme", unidadCompra: "Entero (8-12 kg)", categoria: "Pequeños Animales", imagen: null },

  // ==================== ÓRGANOS Y HUESOS ====================
  { id: 29, nombre: "Hígado de Res", descripcion: "Color bordó brillante, firme, sin manchas", unidadCompra: "Trozo de 1 kg", categoria: "Órganos y Huesos", imagen: null },
  { id: 30, nombre: "Lengua", descripcion: "Áspera, limpia", unidadCompra: "Unidad entera", categoria: "Órganos y Huesos", imagen: null },
  { id: 31, nombre: "Mondongo", descripcion: "Blanco (lavado) o natural", unidadCompra: "1 kg", categoria: "Órganos y Huesos", imagen: null },
  { id: 32, nombre: "Riñón", descripcion: "Grasa blanca que lo cubra (fresco)", unidadCompra: "2-3 unidades", categoria: "Órganos y Huesos", imagen: null },
  { id: 33, nombre: "Chinchulín", descripcion: "Trenzado o limpio, grasa cremosa", unidadCompra: "1-2 kg", categoria: "Órganos y Huesos", imagen: null },
  { id: 34, nombre: "Molleja", descripcion: "De corazón (pref) o de garganta", unidadCompra: "0.5 - 1 kg", categoria: "Órganos y Huesos", imagen: null },
  { id: 35, nombre: "Corazón", descripcion: "Firme, sin grasa excesiva", unidadCompra: "1 unidad", categoria: "Órganos y Huesos", imagen: null },
  { id: 36, nombre: "Rabo", descripcion: "Cola entera", unidadCompra: "1 cola", categoria: "Órganos y Huesos", imagen: null },
  { id: 37, nombre: "Hueso con Tuétano", descripcion: "Caracú cortado (centro)", unidadCompra: "2-3 piezas", categoria: "Órganos y Huesos", imagen: null },
  { id: 38, nombre: "Hueso Puchero", descripcion: "Blanco, carnudo", unidadCompra: "2-3 kg", categoria: "Órganos y Huesos", imagen: null },

  // ==================== VERDURAS ====================
  { id: 39, nombre: "Tomate Perita", descripcion: "Para salsa/guiso, bien rojos", unidadCompra: "Caja (18-20 kg) o 5 kg", categoria: "Verduras", imagen: null },
  { id: 40, nombre: "Tomate Larga Vida", descripcion: "Para ensalada, firmes", unidadCompra: "3 kg", categoria: "Verduras", imagen: null },
  { id: 41, nombre: "Locote Rojo", descripcion: "Piel lisa, gruesos, pesados", unidadCompra: "2 kg", categoria: "Verduras", imagen: null },
  { id: 42, nombre: "Locote Verde", descripcion: "Piel lisa, sin arrugas", unidadCompra: "2 kg", categoria: "Verduras", imagen: null },
  { id: 43, nombre: "Cebolla Blanca", descripcion: "Cabeza mediana, seca", unidadCompra: "Bolsa (18-20 kg) o 5 kg", categoria: "Verduras", imagen: null },
  { id: 44, nombre: "Cebolla Morada", descripcion: "Cabeza chica/mediana", unidadCompra: "2 kg", categoria: "Verduras", imagen: null },
  { id: 45, nombre: "Papa Blanca", descripcion: "Lavada o cepillada, sin brotes", unidadCompra: "Bolsa (25 kg) o 10 kg", categoria: "Verduras", imagen: null },
  { id: 46, nombre: "Zanahoria", descripcion: "Sin tallo verde, rectas", unidadCompra: "3 kg", categoria: "Verduras", imagen: null },
  { id: 47, nombre: "Zapallo", descripcion: "Cáscara dura, pulpa naranja fuerte", unidadCompra: "Trozo grande (5 kg) o Entero", categoria: "Verduras", imagen: null },
  { id: 48, nombre: "Mandioca", descripcion: "Que hierva bien (preguntar al vendedor)", unidadCompra: "5-10 kg", categoria: "Verduras", imagen: null },
  { id: 49, nombre: "Batata", descripcion: "Piel rosada/blanca", unidadCompra: "3 kg", categoria: "Verduras", imagen: null },
  { id: 50, nombre: "Ajo", descripcion: "Cabezas violetas grandes, dientes firmes", unidadCompra: "Ristra o 0.5 kg", categoria: "Verduras", imagen: null },
  { id: 51, nombre: "Choclo", descripcion: "Grano amarillo, tierno (lechoso)", unidadCompra: "Docena", categoria: "Verduras", imagen: null },
  { id: 52, nombre: "Verdeo", descripcion: "Cebollita/Perejil, fresco", unidadCompra: "Mazos grandes", categoria: "Verduras", imagen: null },

  // ==================== FRUTAS ====================
  { id: 53, nombre: "Manzana Roja", descripcion: "Grande, arenosa o crujiente según variedad", unidadCompra: "Caja (18 kg) o Docena", categoria: "Frutas", imagen: null },
  { id: 54, nombre: "Manzana Verde", descripcion: "Ácida, piel lisa", unidadCompra: "2-3 kg", categoria: "Frutas", imagen: null },
  { id: 55, nombre: "Banana", descripcion: "Oro o Karape, sin machucones", unidadCompra: "Caja o 2 Docenas", categoria: "Frutas", imagen: null },
  { id: 56, nombre: "Naranja", descripcion: "De ombligo (mesa) o Común (jugo)", unidadCompra: "Bolsa 100 un. o 2 docenas", categoria: "Frutas", imagen: null },
  { id: 57, nombre: "Pera", descripcion: "De agua", unidadCompra: "2 kg", categoria: "Frutas", imagen: null },
  { id: 58, nombre: "Limón", descripcion: "Sutil o Tahití, jugoso", unidadCompra: "2 kg", categoria: "Frutas", imagen: null },
  { id: 59, nombre: "Sandía", descripcion: "Sonido hueco al golpear", unidadCompra: "Unidad grande", categoria: "Frutas", imagen: null },
  { id: 60, nombre: "Piña", descripcion: "Olor dulce en la base", unidadCompra: "3 unidades", categoria: "Frutas", imagen: null },
  { id: 61, nombre: "Melón", descripcion: "Rocío de Miel o Japonés", unidadCompra: "2 unidades", categoria: "Frutas", imagen: null },
  { id: 62, nombre: "Mamón", descripcion: "Carne firme", unidadCompra: "2 unidades", categoria: "Frutas", imagen: null },
  { id: 63, nombre: "Mburucuyá", descripcion: "Cáscara arrugada (bien maduro)", unidadCompra: "1 docena", categoria: "Frutas", imagen: null },
  { id: 64, nombre: "Guayaba", descripcion: "Fresca, sin golpes", unidadCompra: "1 kg", categoria: "Frutas", imagen: null },
  { id: 65, nombre: "Higo", descripcion: "Maduro (blando), color oscuro", unidadCompra: "500 gr", categoria: "Frutas", imagen: null },
  { id: 66, nombre: "Uva", descripcion: "Negra o Rosada, dulce", unidadCompra: "1-2 kg", categoria: "Frutas", imagen: null },
  { id: 67, nombre: "Mango", descripcion: "Rosa o Tomy (sin fibra si es posible)", unidadCompra: "3 unidades", categoria: "Frutas", imagen: null },
  { id: 68, nombre: "Ciruela", descripcion: "Roja/Negra, dulce", unidadCompra: "1 kg", categoria: "Frutas", imagen: null },
  { id: 69, nombre: "Durazno", descripcion: "Nacional o importado (jugoso)", unidadCompra: "1 kg", categoria: "Frutas", imagen: null },
  { id: 70, nombre: "Frutilla", descripcion: "Roja, fresca (temporada)", unidadCompra: "1 kg o 2 cajas", categoria: "Frutas", imagen: null },

  // ==================== EXÓTICOS ====================
  { id: 71, nombre: "Mariscos", descripcion: "Camarón, Langostino, Pulpo, Calamar (Congelado OK)", unidadCompra: "Según tipo", categoria: "Exóticos", imagen: null }
];

// Obtener categorias unicas
const categorias = [...new Set(productos.map(p => p.categoria))];

// Exportar para uso en app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { productos, categorias };
}
