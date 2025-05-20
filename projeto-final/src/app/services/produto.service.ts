import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private produtos: Produto[] = [
    { id: 1, nome: 'Monitor Dell 24"', descricao: 'Monitor Full HD', preco: 899.99, estoque: 50 },
    { id: 2, nome: 'Teclado Mecânico HyperX', descricao: 'Teclado gamer RGB', preco: 350.00, estoque: 30 },
    { id: 3, nome: 'Mouse Logitech G502', descricao: 'Mouse gamer com múltiplos botões', preco: 250.00, estoque: 40 }
  ];
  private nextId = 4;

  constructor() { }

  getProdutos(): Observable<Produto[]> {
    return of(this.produtos);
  }

  getProdutoById(id: number): Observable<Produto | undefined> {
    const produto = this.produtos.find(p => p.id === id);
    return of(produto);
  }

  addProduto(produto: Produto): Observable<Produto> {
    produto.id = this.nextId++;
    this.produtos.push(produto);
    return of(produto);
  }

  updateProduto(produtoAtualizado: Produto): Observable<Produto> {
    const index = this.produtos.findIndex(p => p.id === produtoAtualizado.id);
    if (index > -1) {
      this.produtos[index] = produtoAtualizado;
    }
    return of(produtoAtualizado);
  }

  deleteProduto(id: number): Observable<boolean> {
    const initialLength = this.produtos.length;
    this.produtos = this.produtos.filter(p => p.id !== id);
    return of(this.produtos.length < initialLength);
  }
}
