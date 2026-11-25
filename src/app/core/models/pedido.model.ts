/** Pedido tal como lo devuelve pedido-service (PedidoResponse.java). */
export interface Pedido {
  id: number;
  productoId: number;
  nombreProducto: string;
  precioUnitario: number;
  cantidad: number;
  total: number;
  creadoEn: string;
}

/** Lo que se envía para hacer un pedido (CrearPedidoRequest.java). */
export interface NuevoPedido {
  productoId: number;
  cantidad: number;
}
