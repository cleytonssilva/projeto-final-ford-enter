import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

// Interface para o usuário logado (simplificada)
interface CurrentUser {
  id: number;
  nome: string;
  funcao: 'administrador' | 'comprador' | 'visualizador' | 'requisitante' | 'aprovador';
}

@Injectable({
  providedIn: 'root' // ESTA LINHA É FUNDAMENTAL!
})
export class AuthService {
  // Simula um usuário logado. Você pode mudar a 'funcao' aqui para testar diferentes perfis.
  private _currentUser = new BehaviorSubject<CurrentUser | null>(
    { id: 4, nome: 'Ana Paula (Admin)', funcao: 'administrador' } // Exemplo: Usuário Administrador
    // { id: 1, nome: 'João Silva (Requisitante)', funcao: 'requisitante' } // Exemplo: Usuário Requisitante
    // { id: 2, nome: 'Maria Souza (Aprovadora)', funcao: 'aprovador' } // Exemplo: Usuário Aprovador
    // { id: 3, nome: 'Pedro Alves (Comprador)', funcao: 'comprador' } // Exemplo: Usuário Comprador
  );

  currentUser$: Observable<CurrentUser | null> = this._currentUser.asObservable();

  constructor() { }

  // Método para simular login (você pode chamar isso de um componente de login real)
  login(userId: number, funcao: CurrentUser['funcao']): void {
    const mockUsers: CurrentUser[] = [
      { id: 1, nome: 'João Silva (Requisitante)', funcao: 'requisitante' },
      { id: 2, nome: 'Maria Souza (Aprovadora)', funcao: 'aprovador' },
      { id: 3, nome: 'Pedro Alves (Comprador)', funcao: 'comprador' },
      { id: 4, nome: 'Ana Paula (Admin)', funcao: 'administrador' },
      { id: 5, nome: 'Carlos Lima (Visualizador)', funcao: 'visualizador' }
    ];
    const user = mockUsers.find(u => u.id === userId && u.funcao === funcao);
    if (user) {
      this._currentUser.next(user);
    } else {
      console.error('Usuário ou função inválidos para login mockado.');
      this._currentUser.next(null);
    }
  }

  // Método para simular logout
  logout(): void {
    this._currentUser.next(null);
  }

  // Verifica se o usuário tem uma função específica
  hasRole(requiredRole: CurrentUser['funcao']): boolean {
    const current = this._currentUser.getValue();
    return current?.funcao === requiredRole;
  }

  // Verifica se o usuário tem uma das funções específicas
  hasAnyRole(requiredRoles: CurrentUser['funcao'][]): boolean {
    const current = this._currentUser.getValue();
    return current ? requiredRoles.includes(current.funcao) : false;
  }
}
