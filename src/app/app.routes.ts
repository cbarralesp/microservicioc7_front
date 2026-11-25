import { Routes } from '@angular/router';

/** Cada pantalla se carga "perezosamente" (lazy loading): solo se descarga cuando se visita. */
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'productos' },
  {
    path: 'productos',
    title: 'Productos · Tienda IPSS',
    loadComponent: () => import('./features/productos/productos.page').then((m) => m.ProductosPage),
  },
  {
    path: 'pedidos',
    title: 'Pedidos · Tienda IPSS',
    loadComponent: () => import('./features/pedidos/pedidos.page').then((m) => m.PedidosPage),
  },
  { path: '**', redirectTo: 'productos' },
];
