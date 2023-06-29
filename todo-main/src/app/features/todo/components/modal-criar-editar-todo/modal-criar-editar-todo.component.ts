import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditarTodo } from 'src/app/core/models/EditarTodo';
import { Todo } from 'src/app/core/models/Todo';
import { NotificacaoService } from 'src/app/core/services/notificacao';

@Component({
  selector: 'app-modal-criar-editar-todo',
  templateUrl: './modal-criar-editar-todo.component.html',
  styleUrls: ['./modal-criar-editar-todo.component.css'],
})
export class ModalCriarEditarTodoComponent {
  private fb = inject(FormBuilder);
  private httpClient = inject(HttpClient);
  private notificacao = inject(NotificacaoService);
  private matDialogRef =
    inject<MatDialogRef<ModalCriarEditarTodoComponent>>(MatDialogRef);

  private todo?: Todo;

  form = this.criarForm();
  carregando = false;

  constructor(@Inject(MAT_DIALOG_DATA) data: Todo) {
    this.todo = data;

    if (this.modo === 'Editar') {
      this.preencherFormulario();
    }
  }

  get modo(): 'Criar' | 'Editar' {
    return this.todo ? 'Editar' : 'Criar';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.notificacao.erro('Preencha os campos corretamente');
      return;
    }

    this.modo === 'Criar' ? this.criarTodo() : this.editarTodo();
  }

  fecharModal(): void {
    this.matDialogRef.close();
  }

  private criarForm() {
    return this.fb.nonNullable.group({
      tarefa: ['', Validators.required],
      descricao: ['', Validators.required],
      status: [false, Validators.required],
    });
  }

  private preencherFormulario(): void {
    this.form.patchValue({
      tarefa: this.todo?.task,
      descricao: this.todo?.description,
      status: this.todo?.status,
    });
  }

  private obterPayloadCriarOuEditarTodo(): EditarTodo {
    const valorFormulario = this.form.getRawValue();

    return {
      description: valorFormulario.descricao,
      task: valorFormulario.tarefa,
      status: valorFormulario.status,
    };
  }

  criarTodo() {
    this.carregando = true;

    fetch('http://127.0.0.1:8000/todo/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(this.obterPayloadCriarOuEditarTodo()),
    }).then(() => {
      this.carregando = false;
      this.matDialogRef.close({
        recarregar: true,
      });

      this.carregando = false;
    });
  }

  private editarTodo() {
    this.carregando = true;

    const body = this.obterPayloadCriarOuEditarTodo();

    this.httpClient
      .patch(`http://localhost:8000/todo/${this.todo?.id}/`, body)
      .subscribe(() => {
        this.matDialogRef.close({
          recarregar: true,
        });
      })
      .add(() => {
        this.carregando = false;
      });
  }
}
