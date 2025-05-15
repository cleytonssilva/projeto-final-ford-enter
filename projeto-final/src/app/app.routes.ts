// import { RouterModule,Routes } from '@angular/router';
// import { ProdutosComponent } from './produtos/produtos.component';
// import { UsuariosComponent } from './usuarios/usuarios.component';
// import { NgModule } from '@angular/core';


// export const routes: Routes = [
//     { path: 'produtos', component: ProdutosComponent },
//     { path: 'usuarios', component: UsuariosComponent },
//     { path: '', redirectTo: '', pathMatch: 'full' }, // Redireciona para 'produtos' por padrão 
// ];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })

// export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

export const routes: Routes = [
  { path: 'produtos', component: ProdutosComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }, // Redireciona para 'produtos' por padrão
];