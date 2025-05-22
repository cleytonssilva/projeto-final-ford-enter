import { Component, OnInit } from '@angular/core';
import { RequisicaoService } from '../services/requisicao.service';
import { UsuarioService } from '../services/usuario.service'; // Para obter o nome do solicitante/aprovador
import { ProdutoService } from '../services/produto.service'; // Para obter o nome do produto
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Requisicao {
  id: number;
  descricaoItem: string;
  quantidade: number;
  produtoId: number | null;
  prazoEntrega: string;
  justificativa: string;
  solicitanteId: number;
  dataRequisicao: string;
  status: 'Pendente' | 'Aprovada' | 'Rejeitada' | 'Em Processo' | 'Concluída';
  aprovadorId: number | null;
  dataAprovacao: string | null;
}

interface Usuario {
  id: number;
  nome: string;
  email: string;
  funcao: 'administrador' | 'comprador' | 'visualizador' | 'requisitante' | 'aprovador';
}

interface Produto {
  id: number;
  nome: string;
}

@Component({
  imports: [FormsModule,CommonModule],
  selector: 'app-requisicoes',
  templateUrl: './requisicoes.component.html',
  styleUrls: ['./requisicoes.component.css']
})
export class RequisicoesComponent implements OnInit {
  requisicoes: Requisicao[] = [];
  usuarios: Usuario[] = []; // Lista de usuários para exibir nomes
  produtos: Produto[] = []; // Lista de produtos para seleção
  requisicaoSelecionada: Requisicao | null = null;
  exibirFormulario: boolean = false;

  constructor(
    private requisicaoService: RequisicaoService,
    private usuarioService: UsuarioService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.carregarDadosIniciais();
  }

  carregarDadosIniciais(): void {
    // Carrega usuários e produtos primeiro para que os nomes possam ser resolvidos
    this.usuarioService.getUsuarios().subscribe(users => {
      this.usuarios = users;
      this.produtoService.getProdutos().subscribe(prods => {
        this.produtos = prods;
        this.carregarRequisicoes(); // Carrega requisições após usuários e produtos
      });
    });
  }

  carregarRequisicoes(): void {
    this.requisicaoService.getRequisicoes().subscribe(data => {
      this.requisicoes = data;
    });
  }

  abrirFormulario(requisicao?: Requisicao): void {
    this.requisicaoSelecionada = requisicao ? { ...requisicao } : {
      id: 0,
      descricaoItem: '',
      quantidade: 1,
      produtoId: null,
      prazoEntrega: '',
      justificativa: '',
      solicitanteId: 1, // Exemplo: ID do requisitante padrão
      dataRequisicao: '',
      status: 'Pendente',
      aprovadorId: null,
      dataAprovacao: null
    };
    // Preenche o prazo de entrega com a data atual + 7 dias para facilitar
    if (!this.requisicaoSelecionada.prazoEntrega) {
      const today = new Date();
      today.setDate(today.getDate() + 7);
      this.requisicaoSelecionada.prazoEntrega = today.toISOString().split('T')[0];
    }
    this.exibirFormulario = true;
  }

  salvarRequisicao(): void {
    if (this.requisicaoSelecionada) {
      if (this.requisicaoSelecionada.id === 0) {
        this.requisicaoService.addRequisicao(this.requisicaoSelecionada).subscribe(() => {
          this.carregarRequisicoes();
          this.fecharFormulario();
        });
      } else {
        this.requisicaoService.updateRequisicao(this.requisicaoSelecionada).subscribe(() => {
          this.carregarRequisicoes();
          this.fecharFormulario();
        });
      }
    }
  }

  excluirRequisicao(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta requisição?')) {
      this.requisicaoService.deleteRequisicao(id).subscribe(() => {
        this.carregarRequisicoes();
      });
    }
  }

  fecharFormulario(): void {
    this.exibirFormulario = false;
    this.requisicaoSelecionada = null;
  }

  // Funções auxiliares para exibir nomes em vez de IDs
  getNomeUsuario(id: number): string {
    return this.usuarios.find(u => u.id === id)?.nome || 'Desconhecido';
  }

  getNomeProduto(id: number | null): string {
    if (id === null) return 'N/A';
    return this.produtos.find(p => p.id === id)?.nome || 'Produto Desconhecido';
  }

  // Função para simular aprovação (apenas para Administradores/Aprovadores)
  aprovarRequisicao(requisicao: Requisicao): void {
    if (confirm('Tem certeza que deseja APROVAR esta requisição?')) {
      // Simula que o usuário logado é o aprovador (ID 2 para Maria Souza)
      requisicao.status = 'Aprovada';
      requisicao.aprovadorId = 2; // Exemplo: Maria Souza (Aprovadora)
      requisicao.dataAprovacao = new Date().toISOString().split('T')[0];
      this.requisicaoService.updateRequisicao(requisicao).subscribe(() => {
        this.carregarRequisicoes();
      });
    }
  }

  // Função para simular rejeição (apenas para Administradores/Aprovadores)
  rejeitarRequisicao(requisicao: Requisicao): void {
    if (confirm('Tem certeza que deseja REJEITAR esta requisição?')) {
      requisicao.status = 'Rejeitada';
      requisicao.aprovadorId = 2; // Exemplo: Maria Souza (Aprovadora)
      requisicao.dataAprovacao = new Date().toISOString().split('T')[0];
      this.requisicaoService.updateRequisicao(requisicao).subscribe(() => {
        this.carregarRequisicoes();
      });
    }
  }
}
