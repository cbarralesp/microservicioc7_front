/**
 * Desarrollo local: las URLs van vacías porque `ng serve` reenvía /api/productos y /api/pedidos
 * a cada microservicio con proxy.conf.json (así no hace falta CORS en local).
 */
export const environment = {
  productoApiUrl: '',
  pedidoApiUrl: '',
};
