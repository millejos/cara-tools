import { Component } from '@angular/core';
import { Calendar } from './features/calendar/calendar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Calendar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {


}