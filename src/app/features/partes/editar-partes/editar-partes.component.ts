import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  DestroyRef,
} from '@angular/core';
import { FormPartesComponent } from '../formulario/form-partes.component';
import { DialogModule } from 'primeng/dialog';
import { Parte } from '../../../core/models/partes.model';
import { PartesService } from '../../../core/services/partes.service';
import { ParteIncompleta } from '../../../core/models/partes-incompleta.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-partes',
  imports: [FormPartesComponent, DialogModule],
  templateUrl: './editar-partes.component.html',
  styleUrl: './editar-partes.component.css',
})
export class EditarPartesComponent implements OnInit {
  @Input({ required: true }) parteId!: string;
  parte: Parte | undefined;

  constructor(private partesService: PartesService, private router: Router) {}

  ngOnInit(): void {
    this.parte = this.partesService.findById(this.parteId);
  }
  onParteSubmit(parteEditada: ParteIncompleta) {
    this.partesService.editarParte(this.parteId, parteEditada);
    this.router.navigate(['/partes']);
  }
}
