import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Interface para definir a estrutura de um usuário com as funções específicas
interface Usuario {
  id: number;
  nome: string;
  email: string;
  // Definindo as funções específicas do sistema de compras
  funcao: 'administrador' | 'comprador' | 'visualizador' | 'requisitante' | 'aprovador';
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // Dados mockados de usuários com suas funções específicas
  private usuarios: Usuario[] = [
    { id: 1, nome: 'João Silva', email: 'joao.silva@ford.com', funcao: 'requisitante' }, // Cria requisições
    { id: 2, nome: 'Maria Souza', email: 'maria.souza@ford.com', funcao: 'aprovador' }, // Aprova requisições
    { id: 3, nome: 'Pedro Alves', email: 'pedro.alves@ford.com', funcao: 'comprador' }, // Cria ordens de compra
    { id: 4, nome: 'Ana Paula', email: 'ana.paula@ford.com', funcao: 'administrador' }, // Gerenciamento completo
    { id: 5, nome: 'Carlos Lima', email: 'carlos.lima@ford.com', funcao: 'visualizador' } // Apenas visualiza
  ];
  private nextId = 6; // Próximo ID disponível para novos usuários

  constructor() { }

  // Retorna todos os usuários como um Observable
  getUsuarios(): Observable<Usuario[]> {
    return of(this.usuarios);
  }

  // Retorna um usuário específico pelo ID
  getUsuarioById(id: number): Observable<Usuario | undefined> {
    const usuario = this.usuarios.find(u => u.id === id);
    return of(usuario);
  }

  // Adiciona um novo usuário
  addUsuario(usuario: Usuario): Observable<Usuario> {
    usuario.id = this.nextId++; // Atribui um novo ID
    this.usuarios.push(usuario); // Adiciona o usuário ao array
    return of(usuario);
  }

  // Atualiza um usuário existente
  updateUsuario(usuarioAtualizado: Usuario): Observable<Usuario> {
    const index = this.usuarios.findIndex(u => u.id === usuarioAtualizado.id);
    if (index > -1) {
      this.usuarios[index] = usuarioAtualizado; // Substitui o usuário existente
    }
    return of(usuarioAtualizado);
  }

  // Exclui um usuário pelo ID
  deleteUsuario(id: number): Observable<boolean> {
    const initialLength = this.usuarios.length;
    this.usuarios = this.usuarios.filter(u => u.id !== id); // Filtra o usuário a ser excluído
    return of(this.usuarios.length < initialLength); // Retorna true se um usuário foi removido
  }
}
