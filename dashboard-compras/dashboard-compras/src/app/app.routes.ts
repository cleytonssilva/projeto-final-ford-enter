import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importa os componentes que serão associados às rotas
import { ProdutosComponent } from './produtos/produtos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';

// Define as rotas da aplicação
export const routes: Routes = [
  // Rota para a seção de Produtos
  { path: 'produtos', component: ProdutosComponent },
  // Rota para a seção de Usuários
  { path: 'usuarios', component: UsuariosComponent },
  // Rota para a seção de Relatórios
  { path: 'relatorios', component: RelatoriosComponent },
  // Rota padrão: redireciona para a seção de Produtos ao acessar a raiz
  { path: '', redirectTo: '/produtos', pathMatch: 'full' },
  // Rota curinga: redireciona para a seção de Produtos se a rota não for encontrada
  { path: '**', redirectTo: '/produtos' }
];

@NgModule({
  // Configura o roteamento principal da aplicação
  imports: [RouterModule.forRoot(routes)],
  // Exporta o RouterModule para ser usado em outros módulos
  exports: [RouterModule]
})
export class AppRoutingModule { }
