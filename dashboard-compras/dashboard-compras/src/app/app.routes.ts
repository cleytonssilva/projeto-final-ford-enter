import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importa os componentes existentes
import { ProdutosComponent } from './produtos/produtos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
// Importa os novos componentes
import { RequisicoesComponent } from './requisicoes/requisicoes.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';

// Define as rotas da aplicação
export const routes: Routes = [
  { path: 'produtos', component: ProdutosComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'relatorios', component: RelatoriosComponent },
  // Novas rotas para Requisições e Fornecedores
  { path: 'requisicoes', component: RequisicoesComponent },
  { path: 'fornecedores', component: FornecedoresComponent },
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

