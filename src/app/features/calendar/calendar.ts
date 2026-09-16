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

  ngAfterViewInit(): void {


    calendarjs.Schedule(this.scheduleContainer.nativeElement,{
      type: 'weekdays', weekly: true, grid: 1, validRange: ['08:00', '15:00'],
      data: libraryEvents, overlap: false,
      onbeforecreate: () => false, onbeforechangeevent: () => false
    });
  }

}
