import { Injectable } from '@angular/core';

export interface Usuario {
  id: number;
  nome: string;
  funcao: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private usuarios: Usuario[] = [
    { id: 1, nome: 'João', funcao: 'Administrador', email: 'joao@empresa.com' },
    { id: 2, nome: 'Maria', funcao: 'Comprador', email: 'maria@empresa.com' }
  ];

  getUsuarios(): Usuario[] {
    return this.usuarios;
  }
}
