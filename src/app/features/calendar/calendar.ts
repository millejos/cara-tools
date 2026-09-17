import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import calendarjs from '@calendarjs/ce';
import { LibraryEvent, libraryEvents } from '../../schedule-data';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const START_OF_DAY_IN_MINUTES = 8 * 60;
const END_OF_DAY_IN_MINUTES = 15 * 60;
const HALF_HOUR_IN_MINUTES = 30;
const PIXELS_PER_MINUTE = 2;
const TIME_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

type ScheduleInstance = ReturnType<typeof calendarjs.Schedule>;

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar implements OnInit, AfterViewInit {
  @ViewChild('scheduleContainer', { static: true })
  private scheduleContainer!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.validateEvents();
  }

  ngAfterViewInit(): void {
    const container = this.scheduleContainer.nativeElement;
    const scheduleData = libraryEvents.map((event) => ({
      ...event,
      readonly: true,
    }));

    const schedule = calendarjs.Schedule(container, {
      type: 'weekdays',
      weekly: true,
      grid: 1,
      validRange: ['08:00', '15:00'],
      data: scheduleData,
      overlap: false,
      onbeforecreate: () => false,
      onbeforechangeevent: () => false,
    });

    this.formatHeaders(container);
    this.formatTimeRows(container);
    this.formatEvents(schedule);
  }

  private validateEvents(): void {
    const eventIds = new Set<string>();

    for (const event of libraryEvents) {
      if (!this.isValidEvent(event, eventIds)) {
        throw new Error(
          `Check event ${event.guid || '(missing guid)'}: use a unique guid, ` +
            'weekday 1–5, and an increasing time range within 08:00–15:00.',
        );
      }

      eventIds.add(event.guid);
    }
  }

  private isValidEvent(event: LibraryEvent, eventIds: Set<string>): boolean {
    const hasValidTimes = [event.start, event.end].every((time) =>
      TIME_PATTERN.test(time),
    );

    return (
      Boolean(event.guid) &&
      !eventIds.has(event.guid) &&
      Number.isInteger(event.weekday) &&
      event.weekday >= 1 &&
      event.weekday <= 5 &&
      hasValidTimes &&
      this.minutes(event.start) >= START_OF_DAY_IN_MINUTES &&
      this.minutes(event.end) <= END_OF_DAY_IN_MINUTES &&
      this.minutes(event.end) > this.minutes(event.start)
    );
  }

  private formatHeaders(container: HTMLDivElement): void {
    const headerCells =
      container.querySelectorAll<HTMLTableCellElement>('thead td');

    headerCells.forEach((cell, index) => {
      cell.dataset['weekday'] = index === 0 ? 'Time' : DAYS[index - 1];
    });
  }

  private formatTimeRows(container: HTMLDivElement): void {
    const bodyRows =
      container.querySelectorAll<HTMLTableRowElement>('tbody tr');

    bodyRows.forEach((row, index) => {
      if (index % HALF_HOUR_IN_MINUTES !== 0) {
        return;
      }

      row.classList.add('half-hour');

      const timeCell = row.cells[0];
      timeCell.replaceChildren();

      const label = document.createElement('div');
      label.className = 'lm-schedule-index';
      label.textContent = this.clock(this.timeFromMinuteIndex(index));

      timeCell.append(label);
    });
  }

  private formatEvents(schedule: ScheduleInstance): void {
    for (const event of libraryEvents) {
      const element = schedule.getEvent(event.guid);

      if (!element) {
        continue;
      }

      const duration = this.minutes(event.end) - this.minutes(event.start);
      const timeLabel = `${this.clock(event.start)}–${this.clock(event.end)}`;
      const accessibleTitle = event.title.replace(/\n/g, ' ');
      const accessibleLabel =
        `${DAYS[event.weekday - 1]}, ${accessibleTitle}, ` +
        `${event.start} to ${event.end}`;

      element.style.height = `${duration * PIXELS_PER_MINUTE}px`;
      element.dataset['timeLabel'] = timeLabel;
      element.setAttribute('role', 'img');
      element.setAttribute('aria-label', accessibleLabel);
      element.tabIndex = 0;
      element.title = accessibleLabel;
    }
  }

  private minutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private timeFromMinuteIndex(index: number): string {
    const hours = Math.floor(index / 60);
    const minutes = String(index % 60).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  private clock(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const twelveHour = hours % 12 || 12;
    return `${twelveHour}:${String(minutes).padStart(2, '0')}`;
  }
}
