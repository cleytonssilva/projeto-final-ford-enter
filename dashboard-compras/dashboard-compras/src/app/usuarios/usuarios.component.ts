import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  funcao: 'administrador' | 'comprador' | 'visualizador';
}

@Component({
  selector: 'app-usuarios',
  imports: [FormsModule,CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioSelecionado: Usuario | null = null;
  exibirFormulario: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  abrirFormulario(usuario?: Usuario): void {
    this.usuarioSelecionado = usuario ? { ...usuario } : { id: 0, nome: '', email: '', funcao: 'comprador' };
    this.exibirFormulario = true;
  }

  salvarUsuario(): void {
    if (this.usuarioSelecionado) {
      if (this.usuarioSelecionado.id === 0) {
        this.usuarioService.addUsuario(this.usuarioSelecionado).subscribe(() => {
          this.carregarUsuarios();
          this.fecharFormulario();
        });
      } else {
        this.usuarioService.updateUsuario(this.usuarioSelecionado).subscribe(() => {
          this.carregarUsuarios();
          this.fecharFormulario();
        });
      }
    }
  }

  excluirUsuario(id: number): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.usuarioService.deleteUsuario(id).subscribe(() => {
        this.carregarUsuarios();
      });
    }
  }

  fecharFormulario(): void {
    this.exibirFormulario = false;
    this.usuarioSelecionado = null;
  }
}
