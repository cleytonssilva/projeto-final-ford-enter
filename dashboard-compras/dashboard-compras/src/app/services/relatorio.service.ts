import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor() { }

  getGastosMensais(): Observable<{ labels: string[], valores: number[] }> {
    const data = {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      valores: [1200, 1500, 1100, 1800, 2000, 1600]
    };
    return of(data);
  }

  getTendenciasCompras(): Observable<{ labels: string[], valores: number[] }> {
    const data = {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      valores: [25, 30, 28, 35]
    };
    return of(data);
  }
}
