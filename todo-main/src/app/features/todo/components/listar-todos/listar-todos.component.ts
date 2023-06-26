import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Todo } from 'src/app/core/services/todo/todo.service';
  
  
  
  @Component({
    selector: 'app-listar-todos',
    templateUrl: './listar-todos.component.html',
    styleUrls: ['./listar-todos.component.css'],
  })
  
  export class ListarTodosComponent implements OnInit {
   private httpClient = inject(HttpClient)
    
    ngOnInit(): void {
      this.getTodos()
    }
  
    displayedColumns: string[] = [
      'tarefa',
      'descricao',
      'dataCriacao',
      'status',
      'acoes',
    ];


    dataSource = new MatTableDataSource<Todo>()

    carregando = false;

    currentId!: number;

    setCurrentId(id: number){
      this.currentId = id
    }

    getTodos(): void {

    this.carregando = true;  

    this.httpClient.get<Todo[]>('http://localhost:8000/todo/').subscribe((response) => {
        this.dataSource.data = response;
          
  }).add(() => {
    this.carregando = false
  })  


    }

    editarTodo(): void {
    
    }
    
    deletarTodo(): void{
      this.carregando = true

      this.httpClient.delete(`http://localhost:8000/todo/${this.currentId}`).subscribe(() => {
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

 


// }

// export interface PeriodicElement {
//   task: string;
//   description: string;
//   created_at: string;
//   status: boolean;
// }

// export class PeriodicElement {
//   options: Record<string, string> = {
//     'accept': 'application/json',
//     'Content-Type': 'application/json',
//     'X-CSRFToken':'a52cVk8RqHF9LNsR6mjzfumXCxDJSTO3O5o1yTsdcEwx1wDuRlXuoR5Rj7aFAYf3' 