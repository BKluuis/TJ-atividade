import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, DividerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'atividade-tecnica-tj';
}
