import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from 'src/app/core/services/todo/todo.service';

@Component({
  selector: 'app-modal-criar-editar-todo',
  templateUrl: './modal-criar-editar-todo.component.html',
  styleUrls: ['./modal-criar-editar-todo.component.css']
})
export class ModalCriarEditarTodoComponent {
  private matDialogRef = inject<MatDialogRef<ModalCriarEditarTodoComponent>>(MatDialogRef);

  private todo?: Todo; 

  constructor(@Inject(MAT_DIALOG_DATA) data: Todo){
    this.todo = data
  }

  get modo(): 'Criar' | 'Editar' {
    return this.todo ? 'Criar' : 'Editar'
  } 



}
