import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { NuevoProducto, Producto } from '../models/producto.model';

/** Capa de acceso a producto-service: solo habla HTTP, no tiene lógica de pantalla. */
@Injectable({ providedIn: 'root' })
export class ProductoApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.productoApiUrl}/api/productos`;

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  crear(producto: NuevoProducto): Observable<Producto> {
    return this.http.post<Producto>(this.url, producto);
  }
}
