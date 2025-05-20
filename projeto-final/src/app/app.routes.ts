import { Routes } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HomeComponent } from './home/home.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';

export const routes: Routes = [
  { path: 'produtos', component: ProdutosComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'home', component: HomeComponent},
  { path: 'relatorios', component: RelatoriosComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redireciona para 'produtos' por padrão
];
