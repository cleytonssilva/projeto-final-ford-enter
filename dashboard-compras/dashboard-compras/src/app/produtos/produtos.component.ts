import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { CommonModule } from '@angular/common';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
}

@Component({
  selector: 'app-produtos',
  imports: [FormsModule,CommonModule],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  produtoSelecionado: Produto | null = null;
  exibirFormulario: boolean = false;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe(data => {
      this.produtos = data;
    });
  }

  abrirFormulario(produto?: Produto): void {
    this.produtoSelecionado = produto ? { ...produto } : { id: 0, nome: '', descricao: '', preco: 0, estoque: 0 };
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
}
