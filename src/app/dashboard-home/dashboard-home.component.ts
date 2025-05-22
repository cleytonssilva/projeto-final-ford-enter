import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service'; // VERIFIQUE ESTE IMPORT
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interface para o usuário logado (repetida para clareza no componente)
interface CurrentUser {
  id: number;
  nome: string;
  funcao: 'administrador' | 'comprador' | 'visualizador' | 'requisitante' | 'aprovador';
}

@Component({
  imports: [CommonModule,FormsModule],
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  currentUser: CurrentUser | null = null;
  private authSubscription!: Subscription;

  constructor(private authService: AuthService) { } // AQUI: O AuthService é injetado

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  isAdministrador(): boolean {
    return this.authService.hasRole('administrador');
  }

  isRequisitante(): boolean {
    return this.authService.hasRole('requisitante');
  }

  isAprovador(): boolean {
    return this.authService.hasRole('aprovador');
  }

  isComprador(): boolean {
    return this.authService.hasRole('comprador');
  }

  isVisualizador(): boolean {
    return this.authService.hasRole('visualizador');
  }

  changeUser(userId: number, funcao: CurrentUser['funcao']): void {
    this.authService.login(userId, funcao);
  }
}
