import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarTodosComponent } from './components/listar-todos';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'lista',
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
