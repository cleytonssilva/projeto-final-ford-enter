import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js'; // Importa os registráveis do Chart.js
import { AfterViewInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  status: string; // Adicionei a propriedade status
}

@Component({
  standalone: true,
  selector: 'app-produtos',
  imports: [FormsModule, CommonModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements OnInit, AfterViewInit {
  produtoSelecionado: Produto | null = null;
  exibirFormulario: boolean = false;
  chart: any;
  produtos = [
    { id:1, nome: 'Produto 1',estoque:20, preco: 12, descricao: 'Descrição do Produto 1', status: 'estoque' },
    { id:2, nome: 'Produto 2',estoque:15, preco: 19, descricao: 'Descrição do Produto 2', status: 'vendas' },
    { id:3, nome: 'Produto 3',estoque:4, preco: 3, descricao: 'Descrição do Produto 3', status: 'compras' },
    { id:4, nome: 'Produto 4',estoque:8, preco: 5, descricao: 'Descrição do Produto 4', status: 'estoque' },
    { id:5, nome: 'Produto 5',estoque:10, preco: 7, descricao: 'Descrição do Produto 5', status: 'vendas' },
    { id:6, nome: 'Produto 6',estoque:2, preco: 9, descricao: 'Descrição do Produto 6', status: 'compras' },
    { id:7, nome: 'Produto 7',estoque:6, preco: 11, descricao: 'Descrição do Produto 7', status: 'estoque' },
    { id:8, nome: 'Produto 8',estoque:3, preco: 13, descricao: 'Descrição do Produto 8', status: 'vendas' },
    { id:9, nome: 'Produto 9',estoque:1, preco: 15, descricao: 'Descrição do Produto 9', status: 'compras' },
    { id:10, nome: 'Produto 10',estoque:5, preco: 17, descricao: 'Descrição do Produto 10', status: 'estoque' }
  ];
  statusSelecionado: string = '';

  // Adicionei a propriedade statusSelecionado para armazenar o status selecionado
  constructor(private produtoService: ProdutoService) {
    Chart.register(...registerables);
  }


  ngOnInit(): void {
    this.carregarProdutos();
    // Inicializações gerais
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe(data => {
      this.produtos = data as Produto[]; // Certifique-se de que o tipo está correto
      this.atualizarGrafico(this.produtos); // Atualiza o gráfico com os produtos carregados
      this.statusSelecionado = 'estoque'; // Define o status padrão
      this.produtos = this.produtos.filter(produto => produto.status === this.statusSelecionado);
      this.atualizarGrafico(this.produtos); // Atualiza o gráfico com os produtos filtrados
    }, error => {
      console.error('Erro ao carregar produtos:', error);
      alert('Erro ao carregar produtos. Tente novamente mais tarde.');
    });
  }
  abrirFormulario(produto?: Produto): void {
    this.produtoSelecionado = produto ? { ...produto } : { id: 0, nome: '', descricao: '', preco: 0, estoque: 0, status: 'estoque' };
    // Inicializa o produto selecionado com valores padrão
    this.produtoSelecionado.status = 'estoque'; // Define o status padrão
    // Adicionei a linha acima para garantir que o status seja definido
    // ao abrir o formulário
    //this.produtoSelecionado.status = 'estoque'; // Define o status padrão
    //this.produtoSelecionado.status = 'estoque'; // Define o status padrão
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

  ngAfterViewInit(): void {
    this.criarGrafico(); // Cria o gráfico após o DOM estar carregado
  }

  criarGrafico(): void {
    const ctx = document.getElementById('mainChart') as HTMLCanvasElement;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [], // Inicialmente vazio
          datasets: [{
            label: 'Preços',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Elemento canvas não encontrado!');
    }
  }

  alterarStatus(event: any): void {
    this.statusSelecionado = event.target.value;
    const produtosFiltrados = this.produtos.filter(produto => produto.status === this.statusSelecionado);

    // Atualiza o gráfico com os dados filtrados
    this.atualizarGrafico(produtosFiltrados);
  }

  atualizarGrafico(produtos: any[]): void {
    this.chart.data.labels = produtos.map(produto => produto.nome);
    this.chart.data.datasets[0].data = produtos.map(produto => produto.preco);
    this.chart.update();
  }
}
