import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Interface para definir a estrutura detalhada de um produto
interface Produto {
  id: number;
  nome: string;
  descricao: string;
  codigoProduto: string; // Novo campo
  unidadeMedida: string; // Novo campo
  especificacoesTecnicas: string; // Novo campo
  fornecedoresPreferenciais: number[]; // Novo campo: array de IDs de fornecedores
  categoria: string; // Novo campo
  preco: number;
  estoque: number;
  historicoPrecos: number[]; // Novo campo: para simular histórico de preços
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  // Dados mockados de produtos, agora mais detalhados
  private produtos: Produto[] = [
    {
      id: 1,
      nome: 'Monitor Dell 24"',
      descricao: 'Monitor Full HD para trabalho e jogos',
      codigoProduto: 'MON-DELL-001',
      unidadeMedida: 'unidade',
      especificacoesTecnicas: 'Resolução 1920x1080, 75Hz, HDMI/DisplayPort',
      fornecedoresPreferenciais: [101, 102], // IDs de fornecedores
      categoria: 'Eletrônicos',
      preco: 899.99,
      estoque: 50,
      historicoPrecos: [950.00, 920.00, 899.99]
    },
    {
      id: 2,
      nome: 'Teclado Mecânico HyperX',
      descricao: 'Teclado gamer RGB com switches Cherry MX',
      codigoProduto: 'TEC-HYPX-002',
      unidadeMedida: 'unidade',
      especificacoesTecnicas: 'Switches Red, Iluminação RGB, Layout ABNT2',
      fornecedoresPreferenciais: [103],
      categoria: 'Periféricos',
      preco: 350.00,
      estoque: 30,
      historicoPrecos: [380.00, 360.00, 350.00]
    },
    {
      id: 3,
      nome: 'Mouse Logitech G502',
      descricao: 'Mouse gamer com múltiplos botões programáveis',
      codigoProduto: 'MOU-LOGI-003',
      unidadeMedida: 'unidade',
      especificacoesTecnicas: '11 botões programáveis, sensor HERO 25K, peso ajustável',
      fornecedoresPreferenciais: [101],
      categoria: 'Periféricos',
      preco: 250.00,
      estoque: 40,
      historicoPrecos: [270.00, 260.00, 250.00]
    }
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
    produto.historicoPrecos = [produto.preco]; // Inicia o histórico com o preço atual
    this.produtos.push(produto);
    return of(produto);
  }

  updateProduto(produtoAtualizado: Produto): Observable<Produto> {
    const index = this.produtos.findIndex(p => p.id === produtoAtualizado.id);
    if (index > -1) {
      // Adiciona o novo preço ao histórico se for diferente do último
      if (this.produtos[index].preco !== produtoAtualizado.preco) {
        produtoAtualizado.historicoPrecos.push(produtoAtualizado.preco);
      }
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
