import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ParteIncompleta } from '../../core/models/partes-incompleta.model';
import { PartesService } from './../../core/services/partes.service';
import { FormPartesComponent } from "./formulario/form-partes.component";
import { ListagemPartesComponent } from './listagem/listagem-partes.component';

@Component({
  selector: 'app-partes',
  imports: [FormPartesComponent, ListagemPartesComponent, DividerModule, CardModule],
  templateUrl: './partes.component.html',
  styleUrl: './partes.component.css'
})
export class PartesComponent {

  constructor(private partesService: PartesService) {}

  onParteSubmit(parte: ParteIncompleta) {
    console.log('Parte submetida:', parte);

    this.partesService.salvarParte(parte);
  }
}
