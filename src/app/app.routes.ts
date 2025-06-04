import { Routes } from '@angular/router';
import { PartesComponent } from './features/partes/partes.component';
import { ConsultaProcessosComponent } from './features/processos/consulta/consulta-processos.component';
import { DetalhesUnidadeComponent } from './features/processos/detalhes-unidade/detalhes-unidade.component';
import { EditarPartesComponent } from './features/partes/editar-partes/editar-partes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'partes', pathMatch: 'full' },
  { path: 'partes', component: PartesComponent },
  { path: 'partes/:parteId', component: EditarPartesComponent },
  { path: 'processos', component: ConsultaProcessosComponent },
  { path: 'processos/:id', component: DetalhesUnidadeComponent }
];
