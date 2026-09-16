import {
  OnInit,
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { libraryEvents } from '../../schedule-data';
import calendarjs from '@calendarjs/ce';

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})

export class Calendar implements OnInit, AfterViewInit {
  @ViewChild('scheduleContainer', { static: true })
  scheduleContainer!: ElementRef<HTMLDivElement>;

  @ViewChildren('thead tr')
  theadRows!: QueryList<ElementRef<HTMLTableRowElement>>;

  @ViewChildren('tbody tr')
  tbodyRows!: QueryList<ElementRef<HTMLTableRowElement>>;

  private minutes = (time: string) => { const [h, m] = time.split(':').map(Number); return h * 60 + m; };
  private days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  private clock = (time: string) => time;
  private ids = new Set();

  ngOnInit(): void {
    for (const e of libraryEvents) {
      if (!e.guid || this.ids.has(e.guid) || !Number.isInteger(e.weekday) || e.weekday < 1 || e.weekday > 5 ||
          ![e.start, e.end].every(t => /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(t)) ||
          this.minutes(e.start) < 480 || this.minutes(e.end) > 900 || this.minutes(e.end) <= this.minutes(e.start)) {
        throw new Error(`Check event ${e.guid || "(missing guid)"}: use a unique guid, weekday 1–5, and an increasing time range within 08:00–15:00.`);
      }
      this.ids.add(e.guid);
    }
  }

  ngAfterViewInit(): void {

    const container = this.scheduleContainer.nativeElement;

    const schedule = calendarjs.Schedule(container, {
      type: 'weekdays', weekly: true, grid: 1, validRange: ['08:00', '15:00'],
      data: libraryEvents, overlap: false,
      onbeforecreate: () => false, onbeforechangeevent: () => false
    });
    
    // Calendar.js uses one pixel/minute by default. Scale BOTH rows and events
    // to two pixels/minute for readable labels without changing actual times.
    this.theadRows.forEach((row, i) => {
      const cell = row.nativeElement.cells[0];
      cell.dataset['weekday'] = i ? this.days[i - 1] : 'Time';
    });

    this.tbodyRows.forEach((row, i) => {
      if (i % 30 === 0) {
        row.nativeElement.classList.add('half-hour');
        row.nativeElement.cells[0].replaceChildren();
        const label = document.createElement('div');
        label.className = 'lm-schedule-index';
        label.textContent = this.clock(`${Math.floor(i / 60)}:${String(i % 60).padStart(2, '0')}`);
        row.nativeElement.cells[0].append(label);
      }
    });
  }

}
