import { Component, DestroyRef, OnInit } from '@angular/core';
import { TableModule, TablePageEvent } from 'primeng/table';
import { catchError, throwError } from 'rxjs';
import { Processo } from '../../../core/models/processo.model';
import { ErrorService } from '../../../core/services/error.service';
import { ProcessosService } from '../../../core/services/processos.service';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-consulta',
  imports: [TableModule, MessageModule, ProgressSpinnerModule],
  templateUrl: './consulta-processos.component.html',
  styleUrl: './consulta-processos.component.css',
})
export class ConsultaProcessosComponent implements OnInit {
  processos: Processo[] = [];
  carregando = true;

  constructor(
    private processosService: ProcessosService,
    private errorService: ErrorService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.carregando = true;
    this.processosService
      .getProcessos()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          this.errorService.mostrarErro('Erro ao carregar os processos.');
          console.log(error);
          return throwError(() => new Error('Erro ao carregar os processos.'));
        })
      )
      .subscribe({
        next: (data) => {
          this.processos = data.sort((a, b) =>
            a.numero.localeCompare(b.numero)
          );
        },
        complete: () => {
          this.carregando = false;
        },
      });
  }
}
