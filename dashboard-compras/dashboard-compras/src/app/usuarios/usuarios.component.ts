import { Component, OnInit } from '@angular/core';
import { UsuariosService, Usuario } from '../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule,FormsModule],
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  isAdmin: boolean = true; // Simulação de permissão

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuarios = this.usuariosService.getUsuarios();
  }
}
