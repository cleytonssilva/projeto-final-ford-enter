import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { FornecedorService } from '../services/fornecedor.service'; // Importa o serviço de fornecedores
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interface para definir a estrutura detalhada de um produto
interface Produto {
  id: number;
  nome: string;
  descricao: string;
  codigoProduto: string;
  unidadeMedida: string;
  especificacoesTecnicas: string;
  fornecedoresPreferenciais: number[];
  categoria: string;
  preco: number;
  estoque: number;
  historicoPrecos: number[];
}

// Interface para definir a estrutura de um fornecedor (para o dropdown)
interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  contato: string;
}

@Component({
  imports: [CommonModule,FormsModule],
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  fornecedores: Fornecedor[] = []; // Lista de fornecedores para o dropdown
  produtoSelecionado: Produto | null = null;
  exibirFormulario: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService // Injeta o serviço de fornecedores
  ) { }

  ngOnInit(): void {
    this.carregarProdutos();
    this.carregarFornecedores(); // Carrega os fornecedores ao iniciar
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe(data => {
      this.produtos = data;
    });
  }

  carregarFornecedores(): void {
    this.fornecedorService.getFornecedores().subscribe(data => {
      this.fornecedores = data;
    });
  }

  abrirFormulario(produto?: Produto): void {
    // Inicializa fornecedoresPreferenciais como um array vazio se for um novo produto
    this.produtoSelecionado = produto ? { ...produto } : {
      id: 0,
      nome: '',
      descricao: '',
      codigoProduto: '',
      unidadeMedida: '',
      especificacoesTecnicas: '',
      fornecedoresPreferenciais: [], // Inicializa como array vazio
      categoria: '',
      preco: 0,
      estoque: 0,
      historicoPrecos: []
    };
    this.exibirFormulario = true;
  }

  salvarProduto(): void {
    if (this.produtoSelecionado) {
      if (this.produtoSelecionado.id === 0) {
        this.produtoService.addProduto(this.produtoSelecionado).subscribe(() => {
          this.carregarProdutos();
          this.fecharFormulario();
        });
      } else {
        this.produtoService.updateProduto(this.produtoSelecionado).subscribe(() => {
          this.carregarProdutos();
          this.fecharFormulario();
        });
      }
    }
  }

  excluirProduto(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.deleteProduto(id).subscribe(() => {
        this.carregarProdutos();
      });
    }
  }

  fecharFormulario(): void {
    this.exibirFormulario = false;
    this.produtoSelecionado = null;
  }

  // Função auxiliar para exibir nomes dos fornecedores preferenciais
  getNomesFornecedores(ids: number[]): string {
    return ids.map(id => this.fornecedores.find(f => f.id === id)?.nome || 'Desconhecido').join(', ');
  }
}
