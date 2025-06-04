import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  imports: [MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  items = [
    {
      label: 'Partes',
      icon: 'pi pi-fw pi-user',
      routerLink: '/partes',
    },
    {
      label: 'Consulta de Processos',
      icon: 'pi pi-fw pi-user',
      routerLink: '/processos',
    },
  ];
}
