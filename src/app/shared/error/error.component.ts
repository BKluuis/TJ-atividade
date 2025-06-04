import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ErrorService } from './../../core/services/error.service';

@Component({
  selector: 'app-error',
  imports: [CardModule, RouterModule, ButtonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent implements OnInit {
  menssagem?: string;

  constructor(
    private router: Router,
    private errorService: ErrorService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.errorService.mensagem$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((m) => (this.menssagem = m));
  }

  onVoltar() {
    this.router.navigate(['../']);
    this.errorService.limparErro();
  }
}
