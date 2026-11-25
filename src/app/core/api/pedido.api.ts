import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { NuevoPedido, Pedido } from '../models/pedido.model';

/** Capa de acceso a pedido-service. */
@Injectable({ providedIn: 'root' })
export class PedidoApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.pedidoApiUrl}/api/pedidos`;

  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.url);
  }

  crear(pedido: NuevoPedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.url, pedido);
  }
}
