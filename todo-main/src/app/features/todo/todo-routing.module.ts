import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarTodoComponent } from './components/criar-todo';
import { ListarTodosComponent } from './components/listar-todos';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'criar',
  },
  {
    path: 'criar',
    component: CriarTodoComponent,
  },
  {
    path: 'lista',
    component: ListarTodosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
