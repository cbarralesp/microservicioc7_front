import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { PedidoApi } from '../../core/api/pedido.api';
import { Pedido } from '../../core/models/pedido.model';
import { ToastService } from '../../shared/ui/toast.service';

/** Pantalla de pedidos: lista lo que guarda pedido-service. */
@Component({
  selector: 'app-pedidos-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './pedidos.page.html',
  styleUrl: './pedidos.page.css',
})
export class PedidosPage implements OnInit {
  private readonly pedidoApi = inject(PedidoApi);
  private readonly toast = inject(ToastService);

  protected readonly pedidos = signal<Pedido[]>([]);
  protected readonly cargando = signal(false);

  ngOnInit(): void {
    this.cargando.set(true);
    this.pedidoApi.listar().subscribe({
      next: (lista) => {
        this.pedidos.set(lista);
        this.cargando.set(false);
      },
      error: (e: Error) => {
        this.cargando.set(false);
        this.toast.error(e.message);
      },
    });
  }
}
