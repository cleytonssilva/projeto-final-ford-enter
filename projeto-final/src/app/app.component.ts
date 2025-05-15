import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@Component({
  selector: 'app-root',
  imports: [RouterLink,RouterOutlet,ProdutosComponent,UsuariosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projeto-final';
}
