import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private menssagem: BehaviorSubject<string> = new BehaviorSubject<string>('');
  mensagem$ = this.menssagem.asObservable();

  mostrarErro(mensagem: string) {
    this.menssagem.next(mensagem);
  }

  limparErro() {
    this.menssagem.next('');
  }
}
