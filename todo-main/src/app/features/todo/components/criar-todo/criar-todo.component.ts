import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificacaoService } from 'src/app/core/services/notificacao';

@Component({
  selector: 'app-criar-todo',
  templateUrl: './criar-todo.component.html',
  styleUrls: ['./criar-todo.component.css'],
})
export class CriarTodoComponent {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private notificacao = inject(NotificacaoService);

  carregando = false;

  form = this.criarForm();

  onSubmit(): void {
    if (this.form.invalid) {
      this.notificacao.erro('Preencha todos os campos obrigatórios');
      return;
    }

    this.criarTodo();
  }

  private criarForm() {
    return this.formBuilder.nonNullable.group({
      tarefa: ['', Validators.required],
      descricao: ['', Validators.required],
      concluido: [false],
    });
  }

  private criarTodo(): void {
    const form = this.form.getRawValue();

    this.carregando = true;

    fetch('http://127.0.0.1:8000/todo/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        task: form.tarefa,
        description: form.descricao,
        status: false,
      }),
    }).then(() => {
      this.router.navigate(['/todo/lista'])
      this.carregando = false
    });
  }
}
