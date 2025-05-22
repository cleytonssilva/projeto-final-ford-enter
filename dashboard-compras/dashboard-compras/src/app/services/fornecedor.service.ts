import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Interface para definir a estrutura de um fornecedor
interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  contato: string; // E-mail ou telefone
  avaliacao: number; // Ex: de 1 a 5 estrelas
}

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  // Dados mockados de fornecedores
  private fornecedores: Fornecedor[] = [
    { id: 101, nome: 'Tech Solutions Ltda.', cnpj: '00.123.456/0001-00', contato: 'comercial@techsolutions.com', avaliacao: 4.5 },
    { id: 102, nome: 'Global Supplies S.A.', cnpj: '11.222.333/0001-11', contato: 'vendas@globalsupplies.com', avaliacao: 4.0 },
    { id: 103, nome: 'Componentes Brasil', cnpj: '22.333.444/0001-22', contato: 'atendimento@componentesbr.com.br', avaliacao: 3.8 }
  ];
  private nextId = 104;

  constructor() { }

  getFornecedores(): Observable<Fornecedor[]> {
    return of(this.fornecedores);
  }

  getFornecedorById(id: number): Observable<Fornecedor | undefined> {
    const fornecedor = this.fornecedores.find(f => f.id === id);
    return of(fornecedor);
  }

  addFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    fornecedor.id = this.nextId++;
    this.fornecedores.push(fornecedor);
    return of(fornecedor);
  }

  updateFornecedor(fornecedorAtualizado: Fornecedor): Observable<Fornecedor> {
    const index = this.fornecedores.findIndex(f => f.id === fornecedorAtualizado.id);
    if (index > -1) {
      this.fornecedores[index] = fornecedorAtualizado;
    }
    return of(fornecedorAtualizado);
  }

  deleteFornecedor(id: number): Observable<boolean> {
    const initialLength = this.fornecedores.length;
    this.fornecedores = this.fornecedores.filter(f => f.id !== id);
    return of(this.fornecedores.length < initialLength);
  }
}
