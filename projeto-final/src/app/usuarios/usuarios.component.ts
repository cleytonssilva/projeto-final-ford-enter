import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-usuarios',
  imports: [FormsModule, CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  

  // title = 'projeto-final';
  // nome: string = '';
  // email: string = '';
  // senha: string = '';
  // telefone: string = '';
  // usuarios: Array<{ nome: string; email: string; senha: string; telefone:string }> = [];

  // adicionarUsuario() {
  //   if (this.nome && this.email && this.senha) {
  //     this.usuarios.push({ nome: this.nome, email: this.email, senha: this.senha, telefone: this.telefone });
  //     this.nome = '';
  //     this.email = '';
  //     this.senha = '';
  //     this.telefone = '';
  //   }
  // }

  // removerUsuario(index: number) {
  //   this.usuarios.splice(index, 1);
  // }
}
