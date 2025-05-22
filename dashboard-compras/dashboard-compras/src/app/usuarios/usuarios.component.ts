import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service'; // Importa o serviço de usuários
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interface para definir a estrutura de um usuário (repetida para clareza no componente)
interface Usuario {
  id: number;
  nome: string;
  email: string;
  funcao: 'administrador' | 'comprador' | 'visualizador' | 'requisitante' | 'aprovador';
}

@Component({
  imports: [CommonModule,FormsModule],
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  // Array para armazenar a lista de usuários
  usuarios: Usuario[] = [];
  // Objeto para armazenar o usuário selecionado para edição ou um novo usuário
  usuarioSelecionado: Usuario | null = null;
  // Flag para controlar a exibição do formulário de adição/edição
  exibirFormulario: boolean = false;

  // Injeta o serviço de usuários no construtor
  constructor(private usuarioService: UsuarioService) { }

  // Método chamado na inicialização do componente
  ngOnInit(): void {
    this.carregarUsuarios(); // Carrega a lista de usuários ao iniciar
  }

  // Carrega a lista de usuários usando o serviço
  carregarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data; // Atribui os dados recebidos à lista de usuários
    });
  }

  // Abre o formulário para adicionar um novo usuário ou editar um existente
  abrirFormulario(usuario?: Usuario): void {
    // Se um usuário for passado, cria uma cópia para edição; caso contrário, cria um novo usuário vazio
    this.usuarioSelecionado = usuario ? { ...usuario } : { id: 0, nome: '', email: '', funcao: 'requisitante' }; // Função padrão para novo usuário
    this.exibirFormulario = true; // Exibe o formulário
  }

  // Salva o usuário (adiciona ou atualiza)
  salvarUsuario(): void {
    if (this.usuarioSelecionado) {
      if (this.usuarioSelecionado.id === 0) {
        // Se o ID for 0, é um novo usuário
        this.usuarioService.addUsuario(this.usuarioSelecionado).subscribe(() => {
          this.carregarUsuarios(); // Recarrega a lista após adicionar
          this.fecharFormulario(); // Fecha o formulário
        });
      } else {
        // Se o ID for diferente de 0, é uma edição
        this.usuarioService.updateUsuario(this.usuarioSelecionado).subscribe(() => {
          this.carregarUsuarios(); // Recarrega a lista após atualizar
          this.fecharFormulario(); // Fecha o formulário
        });
      }
    }
  }

  // Exclui um usuário pelo ID
  excluirUsuario(id: number): void {
    // Confirmação antes de excluir (substituir por modal em produção)
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.usuarioService.deleteUsuario(id).subscribe(() => {
        this.carregarUsuarios(); // Recarrega a lista após excluir
      });
    }
  }

  // Fecha o formulário e limpa o usuário selecionado
  fecharFormulario(): void {
    this.exibirFormulario = false;
    this.usuarioSelecionado = null;
  }
}
