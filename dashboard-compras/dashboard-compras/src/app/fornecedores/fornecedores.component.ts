import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../services/fornecedor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  contato: string;
  avaliacao: number;
}

@Component({
  imports: [CommonModule,FormsModule],
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {
  fornecedores: Fornecedor[] = [];
  fornecedorSelecionado: Fornecedor | null = null;
  exibirFormulario: boolean = false;

  constructor(private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    this.carregarFornecedores();
  }

  carregarFornecedores(): void {
    this.fornecedorService.getFornecedores().subscribe(data => {
      this.fornecedores = data;
    });
  }

  abrirFormulario(fornecedor?: Fornecedor): void {
    this.fornecedorSelecionado = fornecedor ? { ...fornecedor } : { id: 0, nome: '', cnpj: '', contato: '', avaliacao: 0 };
    this.exibirFormulario = true;
  }

  salvarFornecedor(): void {
    if (this.fornecedorSelecionado) {
      if (this.fornecedorSelecionado.id === 0) {
        this.fornecedorService.addFornecedor(this.fornecedorSelecionado).subscribe(() => {
          this.carregarFornecedores();
          this.fecharFormulario();
        });
      } else {
        this.fornecedorService.updateFornecedor(this.fornecedorSelecionado).subscribe(() => {
          this.carregarFornecedores();
          this.fecharFormulario();
        });
      }
    }
  }

  excluirFornecedor(id: number): void {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
      this.fornecedorService.deleteFornecedor(id).subscribe(() => {
        this.carregarFornecedores();
      });
    }
  }

  fecharFormulario(): void {
    this.exibirFormulario = false;
    this.fornecedorSelecionado = null;
  }
}
