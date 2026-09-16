import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { libraryEvents } from '../../schedule-data';
import calendarjs from '@calendarjs/ce';

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})

export class Calendar implements AfterViewInit {
  @ViewChild('scheduleContainer', { static: true })
  scheduleContainer!: ElementRef<HTMLDivElement>;

  private minutes = (time: string) => { const [h, m] = time.split(':').map(Number); return h * 60 + m; };
  private days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  private clock = (time: string) => time;

  ngAfterViewInit(): void {

    const container = this.scheduleContainer.nativeElement;

    const schedule = calendarjs.Schedule(container, {
      type: 'weekdays', weekly: true, grid: 1, validRange: ['08:00', '15:00'],
      data: libraryEvents, overlap: false,
      onbeforecreate: () => false, onbeforechangeevent: () => false
    });

    // Calendar.js uses one pixel/minute by default. Scale BOTH rows and events
    // to two pixels/minute for readable labels without changing actual times.
    container.querySelectorAll('thead td').forEach((cell, i) => {
      cell.dataset.weekday = i ? this.days[i - 1] : 'Time';
    });
    container.querySelectorAll('tbody tr').forEach((row, i) => {
      if (i % 30 === 0) {
        row.classList.add('half-hour');
        rowcells[0].replaceChildren();
        const label = document.createElement('div');
        label.className = 'lm-schedule-index';
        label.textContent = clock(`${Math.floor(i / 60)}:${String(i % 60).padStart(2, '0')}`);
        row.cells[0].append(label);
      }
    });
  }

}
