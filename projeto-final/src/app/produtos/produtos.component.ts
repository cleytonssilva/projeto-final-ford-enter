import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-produtos',
  imports: [FormsModule,CommonModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {
  produtos: any[] = [
    { id: 1, nome: 'Produto 1', preco: 10.0, descrição:'Eletronicos' , status: 'estoque' },
    { id: 2, nome: 'Produto 2', preco: 20.0, descrição:'Móveis', status: 'vendas' },
    { id: 3, nome: 'Produto 3', preco: 30.0, descrição:'Diversos' , status: 'compras' }
  ];
  statusSelecionado: string = ''; // Status inicial

  alterarStatus(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Converta o EventTarget para HTMLSelectElement
    this.statusSelecionado = selectElement.value; // Obtenha o valor selecionado
    console.log('Status selecionado:', this.statusSelecionado); // Para depuração
  }

  // alterarStatus(status: string) {
  //   this.statusSelecionado = status;
  //   console.log('Status selecionado:', this.statusSelecionado);
  // }
  // adicionarProduto() {
  //   const novoProduto = { id: this.produtos.length + 1, nome: 'Novo Produto', preco: 0.0 };
  //   this.produtos.push(novoProduto);
  // }

}
