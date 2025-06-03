import { PartesService } from './../../core/services/partes.service';
import { Component } from '@angular/core';
import { FormPartesComponent } from "./formulario/form-partes.component";
import { ListagemPartesComponent } from './listagem/listagem-partes.component';
import { DividerModule } from 'primeng/divider';
import { Parte } from '../../core/models/partes.model';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-partes',
  imports: [FormPartesComponent, ListagemPartesComponent, DividerModule, CardModule],
  templateUrl: './partes.component.html',
  styleUrl: './partes.component.css'
})
export class PartesComponent {

  constructor(private partesService: PartesService) {}

  onParteSubmit(parte: Parte) {
    console.log('Parte submetida:', parte);

    this.partesService.saveParte(parte);
  }
}
