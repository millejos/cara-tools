import {
  OnInit,
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
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

  private minutes = (time: string) => { const [h, m] = time.split(':').map(Number); return h * 60 + m; };
  private days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  private clock(time: string): string {
    const [hour, minute] = time.split(':').map(Number);
    return `${hour % 12 || 12}:${String(minute).padStart(2, '0')}`;
  }
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

    const headerCells = container.querySelectorAll<HTMLTableCellElement>('thead td');
    const bodyRows = container.querySelectorAll<HTMLTableRowElement>('tbody tr');

    // Calendar.js uses one pixel/minute by default. Scale BOTH rows and events
    // to two pixels/minute for readable labels without changing actual times.
    headerCells.forEach((cell, index) => {
      cell.dataset['weekday'] =
        index === 0 ? 'Time' : this.days[index - 1];
    });

    bodyRows.forEach((row, index) => {
      if (index % 30 === 0) {
        row.classList.add('half-hour');

        const timeCell = row.cells[0];
        timeCell.replaceChildren();

        const label = document.createElement('div');
        label.className = 'lm-schedule-index';
        label.textContent = this.clock(
          `${Math.floor(index / 60)}:${String(index % 60).padStart(2, '0')}`,
        );

        timeCell.append(label);
      }
    });
  }

}
