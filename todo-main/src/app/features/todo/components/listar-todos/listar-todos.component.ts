import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalCriarEditarTodoComponent } from '../modal-criar-editar-todo';
import { Todo } from 'src/app/core/models/Todo';

@Component({
  selector: 'app-listar-todos',
  templateUrl: './listar-todos.component.html',
  styleUrls: ['./listar-todos.component.css'],
})
export class ListarTodosComponent implements OnInit {
  private httpClient = inject(HttpClient);

  private matDialog = inject(MatDialog);

  ngOnInit(): void {
    this.carregarTodos();
  }

  displayedColumns = ['tarefa', 'descricao', 'dataCriacao', 'status', 'acoes'];

  dataSource = new MatTableDataSource<Todo>();

  carregando = false;

  todoSelecionado!: Todo;

  carregarTodos(): void {
    this.carregando = true;

    this.httpClient
      .get<Todo[]>('http://localhost:8000/todo/')
      .subscribe((response) => {
        this.dataSource.data = response;
      })
      .add(() => {
        this.carregando = false;
      });
  }

  abrirModal(acao: 'Criar' | 'Editar'): void {
    let data: Todo | undefined;

    if (acao === 'Editar') {
      data = this.todoSelecionado;
    } else {
      data = undefined;
    }

    this.matDialog
      .open(ModalCriarEditarTodoComponent, {
        autoFocus: false,
        width: '600px',
        data,
      })
      .afterClosed()
      .subscribe((params) => {
        if (params?.recarregar) {
          this.carregarTodos();
        }
      });
  }

  openMenu(todo: Todo) {
    this.todoSelecionado = todo;
  }

  deletarTodo(): void {
    this.carregando = true;

    this.httpClient
      .delete(`http://localhost:8000/todo/${this.todoSelecionado.id}`)
      .subscribe(() => {
        this.carregarTodos();
      })
      .add(() => {
        this.carregando = false;
      });
  }
}
