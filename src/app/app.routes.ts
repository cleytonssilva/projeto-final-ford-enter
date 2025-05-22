import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importa os componentes existentes
import { ProdutosComponent } from './produtos/produtos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { RequisicoesComponent } from './requisicoes/requisicoes.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { PoliticaPrivacidadeComponent } from './politica-privacidade/politica-privacidade.component'; // NOVO: Importa o componente da Política de Privacidade

// Define as rotas da aplicação
export const routes: Routes = [
  { path: 'dashboard', component: DashboardHomeComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'requisicoes', component: RequisicoesComponent },
  { path: 'fornecedores', component: FornecedoresComponent },
  { path: 'relatorios', component: RelatoriosComponent },
  { path: 'politica-privacidade', component: PoliticaPrivacidadeComponent }, // NOVO: Rota para a Política de Privacidade
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
