import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Parte } from '../../../core/models/partes.model';
import { CpfCnpjPipe } from '../../../core/pipes/cpf-cnpj.pipe';
import { PartesService } from '../../../core/services/partes.service';
import { EditarPartesComponent } from "../editar-partes/editar-partes.component";

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
  isEditando: boolean = false;
  parteEditando!: Parte;

  constructor(
    private partesService: PartesService,
    private destroyRef: DestroyRef,
    private router: Router
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

  editarParte(parteId: string) {
    this.router.navigate(['/partes', parteId]);
  }
}
