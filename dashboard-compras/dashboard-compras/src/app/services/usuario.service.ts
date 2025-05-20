import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  funcao: 'administrador' | 'comprador' | 'visualizador';
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: Usuario[] = [
    { id: 1, nome: 'João Silva', email: 'joao.silva@empresa.com', funcao: 'administrador' },
    { id: 2, nome: 'Maria Souza', email: 'maria.souza@empresa.com', funcao: 'comprador' },
    { id: 3, nome: 'Pedro Santos', email: 'pedro.santos@empresa.com', funcao: 'visualizador' }
  ];
  private nextId = 4;

  constructor() { }

  getUsuarios(): Observable<Usuario[]> {
    return of(this.usuarios);
  }

  getUsuarioById(id: number): Observable<Usuario | undefined> {
    const usuario = this.usuarios.find(u => u.id === id);
    return of(usuario);
  }
  // getUsuariosByFuncao(funcao: 'administrador' | 'comprador' | 'visualizador'): Observable<Usuario[]> {
  //   const usuariosFiltrados = this.usuarios.filter(u => u.funcao === funcao);
  //   return of(usuariosFiltrados);
  // }
  // getUsuariosByNome(nome: string): Observable<Usuario[]> {
  //   const usuariosFiltrados = this.usuarios.filter(u => u.nome.toLowerCase().includes(nome.toLowerCase()));
  //   return of(usuariosFiltrados);
  // }
  // getUsuariosByEmail(email: string): Observable<Usuario[]> {
  //   const usuariosFiltrados = this.usuarios.filter(u => u.email.toLowerCase().includes(email.toLowerCase()));
  //   return of(usuariosFiltrados);
  // }
  // getUsuariosByNomeOuEmail(nomeOuEmail: string): Observable<Usuario[]> {
  //   const usuariosFiltrados = this.usuarios.filter(u =>
  //     u.nome.toLowerCase().includes(nomeOuEmail.toLowerCase()) ||
  //     u.email.toLowerCase().includes(nomeOuEmail.toLowerCase())
  //   );
  //   return of(usuariosFiltrados);
  // }

  addUsuario(usuario: Usuario): Observable<Usuario> {
    usuario.id = this.nextId++;
    this.usuarios.push(usuario);
    return of(usuario);
  }

  updateUsuario(usuarioAtualizado: Usuario): Observable<Usuario> {
    const index = this.usuarios.findIndex(u => u.id === usuarioAtualizado.id);
    if (index > -1) {
      this.usuarios[index] = usuarioAtualizado;
    }
    return of(usuarioAtualizado);
  }

  deleteUsuario(id: number): Observable<boolean> {
    const initialLength = this.usuarios.length;
    this.usuarios = this.usuarios.filter(u => u.id !== id);
    return of(this.usuarios.length < initialLength);
  }
}
