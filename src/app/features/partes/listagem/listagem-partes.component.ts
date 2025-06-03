import { Component, OnInit, DestroyRef } from '@angular/core';
import { PartesService } from '../../../core/services/partes.service';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Parte } from '../../../core/models/partes.model';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { CpfCnpjPipe } from '../../../core/pipes/cpf-cnpj.pipe';

@Component({
  selector: 'app-partes-listagem',
  imports: [
    TableModule,
    TagModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    MultiSelectModule,
    SelectModule,
    MessageModule,
    CardModule,
    CpfCnpjPipe
  ],
  templateUrl: './listagem-partes.component.html',
  styleUrl: './listagem-partes.component.css',
})
export class ListagemPartesComponent implements OnInit {
  partes: Parte[] = [];
  loading: boolean = true;

  constructor(
    private partesService: PartesService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.partesService.partes$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((partes) => {
        this.partes = partes;
        console.log('Partes carregadas:', this.partes);
      });
  }

  excluirParte(parte: Parte) {
    this.partesService.excluirParte(parte);
  }
  editarParte(_t12: any) {
    throw new Error('Method not implemented.');
  }
}
