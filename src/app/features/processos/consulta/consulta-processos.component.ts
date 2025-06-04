import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { catchError, throwError } from 'rxjs';
import { Processo } from '../../../core/models/processo.model';
import { ErrorService } from '../../../core/services/error.service';
import { ProcessosService } from '../../../core/services/processos.service';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-consulta',
  imports: [TableModule, MessageModule],
  templateUrl: './consulta-processos.component.html',
  styleUrl: './consulta-processos.component.css',
})
export class ConsultaProcessosComponent implements OnInit {
  processos: Processo[] = [];

  constructor(
    private processosService: ProcessosService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.processosService
      .getProcessos()
      .pipe(
        catchError((error) => {
          this.errorService.mostrarErro('Erro ao carregar os processos.');
          console.log(error);
          return throwError(() => new Error('Erro ao carregar os processos.'));
        })
      )
      .subscribe((data) => {
        this.processos = data.sort((a, b) => a.numero.localeCompare(b.numero));
      });
  }
}
