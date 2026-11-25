import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PedidoApi } from '../../core/api/pedido.api';
import { ProductoApi } from '../../core/api/producto.api';
import { Producto } from '../../core/models/producto.model';
import { ToastService } from '../../shared/ui/toast.service';

/** Pantalla de productos: lista (producto-service), crea productos y compra (pedido-service). */
@Component({
  selector: 'app-productos-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './productos.page.html',
  styleUrl: './productos.page.css',
})
export class ProductosPage implements OnInit {
  private readonly productoApi = inject(ProductoApi);
  private readonly pedidoApi = inject(PedidoApi);
  private readonly toast = inject(ToastService);

  protected readonly productos = signal<Producto[]>([]);
  protected readonly cargando = signal(false);

  // campos del formulario "nuevo producto"
  protected nombre = '';
  protected precio: number | null = null;
  protected stock: number | null = null;

  // cantidad a comprar por producto (id -> cantidad)
  protected readonly cantidades: Record<number, number> = {};

  ngOnInit(): void {
    this.cargar();
  }

  protected cargar(): void {
    this.cargando.set(true);
    this.productoApi.listar().subscribe({
      next: (lista) => {
        this.productos.set(lista);
        this.cargando.set(false);
      },
      error: (e: Error) => {
        this.cargando.set(false);
        this.toast.error(e.message);
      },
    });
  }

  protected crear(): void {
    if (!this.nombre.trim() || !this.precio || this.stock === null) {
      this.toast.error('Completa nombre, precio y stock');
      return;
    }
    this.productoApi.crear({ nombre: this.nombre, precio: this.precio, stock: this.stock }).subscribe({
      next: (p) => {
        this.toast.exito(`Producto "${p.nombre}" creado`);
        this.nombre = '';
        this.precio = null;
        this.stock = null;
        this.cargar();
      },
      error: (e: Error) => this.toast.error(e.message),
    });
  }

  protected comprar(producto: Producto): void {
    const cantidad = this.cantidades[producto.id] ?? 1;
    this.pedidoApi.crear({ productoId: producto.id, cantidad }).subscribe({
      next: (pedido) => {
        this.toast.exito(`Pedido #${pedido.id} creado (total $${pedido.total})`);
        this.cargar();   // el stock cambió en producto-service
      },
      error: (e: Error) => this.toast.error(e.message),
    });
  }
}
