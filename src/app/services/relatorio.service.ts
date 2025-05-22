import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor() { }

  // Retorna dados mockados para o gráfico de gastos mensais
  getGastosMensais(): Observable<{ labels: string[], valores: number[] }> {
    const data = {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], // Rótulos do eixo X (meses)
      valores: [1200, 1500, 1100, 1800, 2000, 1600, 2200, 1900, 2500, 2100, 2300, 2800] // Valores do eixo Y (gastos)
    };
    return of(data);
  }

  // Retorna dados mockados para o gráfico de tendências de compras (número de compras)
  getTendenciasCompras(): Observable<{ labels: string[], valores: number[] }> {
    const data = {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6'],
      valores: [25, 30, 28, 35, 32, 40]
    };
    return of(data);
  }

  // Novo: Retorna dados mockados para o gráfico de status de requisições
  getRequisicoesPorStatus(): Observable<{ labels: string[], valores: number[] }> {
    const data = {
      labels: ['Pendente', 'Aprovada', 'Rejeitada', 'Em Processo', 'Concluída'],
      valores: [5, 12, 2, 7, 10] // Número de requisições em cada status
    };
    return of(data);
  }

  // Novo: Retorna dados mockados para o gráfico de gastos por categoria de produto
  getGastosPorCategoria(): Observable<{ labels: string[], valores: number[] }> {
    const data = {
      labels: ['Eletrônicos', 'Periféricos', 'Escritório', 'Serviços', 'Manutenção'],
      valores: [5000, 3500, 1200, 4000, 2500] // Gastos em cada categoria
    };
    return of(data);
  }
}
