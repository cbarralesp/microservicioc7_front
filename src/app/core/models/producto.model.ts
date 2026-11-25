/** Producto tal como lo devuelve producto-service (ProductoResponse.java). */
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

/** Lo que se envía para crear un producto (CrearProductoRequest.java). */
export interface NuevoProducto {
  nombre: string;
  precio: number;
  stock: number;
}
