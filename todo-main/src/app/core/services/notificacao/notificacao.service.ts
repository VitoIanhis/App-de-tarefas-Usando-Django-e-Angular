import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificacaoService {
  private matSnackBar = inject(MatSnackBar);

  erro(mensagem: string): void {
    this.matSnackBar.open(`${mensagem}`, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  sucesso(mensagem: string): void {
    this.matSnackBar.open(`${mensagem}`, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
