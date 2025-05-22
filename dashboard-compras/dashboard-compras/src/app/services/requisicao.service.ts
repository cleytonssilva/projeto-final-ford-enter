import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Interface para definir a estrutura de uma requisição de compra
interface Requisicao {
  id: number;
  descricaoItem: string;
  quantidade: number;
  produtoId: number | null; // ID do produto relacionado (opcional)
  prazoEntrega: string; // Data no formato YYYY-MM-DD
  justificativa: string;
  solicitanteId: number; // ID do usuário que fez a requisição
  dataRequisicao: string; // Data da requisição
  status: 'Pendente' | 'Aprovada' | 'Rejeitada' | 'Em Processo' | 'Concluída'; // Status da requisição
  aprovadorId: number | null; // ID do usuário que aprovou (se houver)
  dataAprovacao: string | null; // Data da aprovação (se houver)
}

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService {
  // Dados mockados de requisições
  private requisicoes: Requisicao[] = [
    {
      id: 1,
      descricaoItem: '500 folhas de papel A4',
      quantidade: 500,
      produtoId: null,
      prazoEntrega: '2025-06-10',
      justificativa: 'Necessidade de material de escritório para o setor administrativo.',
      solicitanteId: 1, // João Silva (Requisitante)
      dataRequisicao: '2025-05-20',
      status: 'Pendente',
      aprovadorId: null,
      dataAprovacao: null
    },
    {
      id: 2,
      descricaoItem: '10 unidades de Caneta Esferográfica Azul',
      quantidade: 10,
      produtoId: null,
      prazoEntrega: '2025-06-05',
      justificativa: 'Reposição de estoque de materiais de consumo.',
      solicitanteId: 2, // Maria Souza (Compradora)
      dataRequisicao: '2025-05-18',
      status: 'Aprovada',
      aprovadorId: 2, // Maria Souza (Aprovadora)
      dataAprovacao: '2025-05-19'
    },
    {
      id: 3,
      descricaoItem: 'Serviço de manutenção de impressoras',
      quantidade: 1,
      produtoId: null,
      prazoEntrega: '2025-06-15',
      justificativa: 'Manutenção preventiva de equipamentos de impressão.',
      solicitanteId: 1,
      dataRequisicao: '2025-05-21',
      status: 'Em Processo',
      aprovadorId: null,
      dataAprovacao: null
    }
  ];
  private nextId = 4;

  constructor() { }

  getRequisicoes(): Observable<Requisicao[]> {
    return of(this.requisicoes);
  }

  getRequisicaoById(id: number): Observable<Requisicao | undefined> {
    const requisicao = this.requisicoes.find(r => r.id === id);
    return of(requisicao);
  }

  addRequisicao(requisicao: Requisicao): Observable<Requisicao> {
    requisicao.id = this.nextId++;
    requisicao.dataRequisicao = new Date().toISOString().split('T')[0]; // Data atual
    requisicao.status = 'Pendente'; // Nova requisição sempre começa como Pendente
    this.requisicoes.push(requisicao);
    return of(requisicao);
  }

  updateRequisicao(requisicaoAtualizada: Requisicao): Observable<Requisicao> {
    const index = this.requisicoes.findIndex(r => r.id === requisicaoAtualizada.id);
    if (index > -1) {
      this.requisicoes[index] = requisicaoAtualizada;
    }
    return of(requisicaoAtualizada);
  }

  deleteRequisicao(id: number): Observable<boolean> {
    const initialLength = this.requisicoes.length;
    this.requisicoes = this.requisicoes.filter(r => r.id !== id);
    return of(this.requisicoes.length < initialLength);
  }
}
