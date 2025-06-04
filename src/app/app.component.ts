import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { DividerModule } from 'primeng/divider';

import { ErrorService } from './core/services/error.service';
import { ErrorComponent } from './shared/error/error.component';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, DividerModule, ErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'atividade-tecnica-tj';
  error?: boolean;

  constructor(
    private errorService: ErrorService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    this.errorService.mensagem$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((message) => {
        this.error = !!(message && message.trim() !== '');
      });
  }
}
