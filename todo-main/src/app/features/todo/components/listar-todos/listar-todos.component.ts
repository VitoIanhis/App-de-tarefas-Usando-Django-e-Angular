import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { EditarTodoPayload, Todo } from 'src/app/core/services/todo/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCriarEditarTodoComponent } from '../modal-criar-editar-todo';
  
  
  
  @Component({
    selector: 'app-listar-todos',
    templateUrl: './listar-todos.component.html',
    styleUrls: ['./listar-todos.component.css'],
  })
  
  export class ListarTodosComponent implements OnInit {
   private httpClient = inject(HttpClient)

   private matDialog = inject(MatDialog);
    
    ngOnInit(): void {
      this.getTodos()
    }

    displayedColumns = [
      'tarefa',
      'descricao',
      'dataCriacao',
      'status',
      'acoes',
    ];


    dataSource = new MatTableDataSource<Todo>()

    carregando = false;

    todoSelecionado!: Todo;

    getTodos(): void {

    this.carregando = true;  

    this.httpClient.get<Todo[]>('http://localhost:8000/todo/').subscribe((response) => {
        this.dataSource.data = response;
          
  }).add(() => {
    this.carregando = false
  })  
}

  abrirModal(acao: 'Criar' | 'Editar'): void {
    let data: Todo | undefined

    if(acao === 'Editar') {
      data = this.todoSelecionado
    } else {
      data = undefined
    }


    this.matDialog.open(ModalCriarEditarTodoComponent, {
      autoFocus: false,
      width: '500px',
      data
    })
  }

 private obterPayloadEditarTodo(): EditarTodoPayload {
  return {
  descricao: this.todoSelecionado.descricao,
  tarefa: this.todoSelecionado.tarefa,
  status: this.todoSelecionado.status
  }
}

     openMenu(todo: Todo ){
      this.todoSelecionado = todo
    }


    editarTodo() {
    const body = this.obterPayloadEditarTodo()

    this.httpClient.patch(`http://localhost:8000/todo/${this.todoSelecionado.id}`, body).subscribe(()=> {
       this.getTodos()
    }).add(() => {
      this.carregando = false
    });
  }

    deletarTodo(): void{
      this.carregando = true

      this.httpClient.delete(`http://localhost:8000/todo/${this.todoSelecionado.id}`).subscribe(() => {
        this.getTodos()
      }).add(() => {
        this.carregando = false
      })
      
    }
  }
  
//   editarTodo(): void {
//     console.log('EDITAR TODO');
//     console.log(this.currentId)
//     fetch(`http://127.0.0.1:8000/todo/${this.currentId}/`, {
//       method: 'PATCH',
//       headers: this.options,
//       body: JSON.stringify({
//         task: "",
//         description: "",
//         status: true
//       })
//     })
//     .then(res => console.log(res)) 
//   }
