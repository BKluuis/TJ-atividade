import { Routes } from '@angular/router';
import { ListagemPartesComponent } from './features/partes/listagem/listagem-partes.component';
import { CadastroPartesComponent } from './features/partes/cadastro/cadastro-partes.component';
import { ConsultaProcessosComponent } from './features/processos/consulta/consulta-processos.component';
import { DetalhesUnidadeComponent } from './features/processos/detalhes-unidade/detalhes-unidade.component';

export const routes: Routes = [
  { path: '', redirectTo: 'partes', pathMatch: 'full' },
  { path: 'partes', component: ListagemPartesComponent },
  { path: 'cadastro', component: CadastroPartesComponent },
  { path: 'processos', component: ConsultaProcessosComponent },
  { path: 'processos/:id', component: DetalhesUnidadeComponent }
];
