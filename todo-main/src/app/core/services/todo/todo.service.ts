import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Todo extends CriarOuEditarTodoPayload {
  id: number;
}

export interface CriarOuEditarTodoPayload  {
  task: string;
  description: string
  status: boolean
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private httpclient = inject(HttpClient);
  private urlApi = 'http://localhost:8000/todo/';
  private headers = new HttpHeaders().set('Content=type', 'application/json')

  getTodos(): Observable<Todo[]> {
    const options = {
      headers: this.headers,
      method: 'GET'
    }

    return this.httpclient.get<Todo[]>(this.urlApi, options)
  }

  // getTodoById(id: number): Observable<Todo> {
  //   const url = `${this.urlApi}/${id}`

  //   const options = {
  //     headers: this.headers,
  //     method: 'GET'
  //   }

  //   return this.httpclient.get<Todo>(url, options)
  // }


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
    
    // return this.httpclient.post<Todo>(this.urlApi,  options )
  // }

  editarTodo(payload: Todo): Observable<void> {
    const url = `$${this.urlApi}/${payload.id}`

    const options = {
      headers: this.getOptions,
      method: 'PATCH',
      payload
    }

    return this.httpclient.patch<void>(url, { options })
  }

  deletarTodo(id: string): Observable<void> {
    const url = `${this.urlApi}/${id}`

    const options = {
      headers: this.headers,
      method: 'DELETE',
    }
    
    return this.httpclient.delete<void>(url, options)
  }

    private getOptions: Record<string, string> = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken':'a52cVk8RqHF9LNsR6mjzfumXCxDJSTO3O5o1yTsdcEwx1wDuRlXuoR5Rj7aFAYf3' 
  }

  
}

