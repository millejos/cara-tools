import { Component, ElementRef, ViewChild, output } from '@angular/core';
import { LibraryEvent } from '../../schedule-data';

@Component({
  selector: 'app-event-editor',
  imports: [],
  templateUrl: './event-editor.html',
  styleUrl: './event-editor.css',
})

export class EventEditor {
  @ViewChild('dialog', { static: true }) private dialog!: ElementRef<HTMLDialogElement>;
  readonly saved = output<LibraryEvent>();
  readonly days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  readonly colors = ['#fff2cc', '#fce5cd', '#d9ead3', '#c9daf8', '#f4cccc', '#d5a6bd', '#b4a7d6', '#cccccc', '#b7b7b7'];
  editing = false;
  error = '';
  draft: LibraryEvent = this.newEvent();

  open(event?: LibraryEvent): void {
    this.editing = Boolean(event);
    this.error = '';
    this.draft = event ? { ...event, color: this.normalizeColor(event.color) } : this.newEvent();
    for (const name of ['title', 'weekday', 'start', 'end', 'color'] as const) {
      const control = this.dialog.nativeElement.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[name="' + name + '"]');
      if (control) control.value = String(this.draft[name]);
    }
    this.dialog.nativeElement.showModal();
  }

  chooseColor(color: string): void {
    this.draft.color = color;
    const input = this.dialog.nativeElement.querySelector<HTMLInputElement>('input[name=color]');
    if (input) input.value = color;
  }

  submit(event: Event): void {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const record: LibraryEvent = {
      guid: this.draft.guid,
      title: String(data.get('title')).trim(),
      weekday: Number(data.get('weekday')) as LibraryEvent['weekday'],
      start: String(data.get('start')),
      end: String(data.get('end')),
      color: String(data.get('color')),
    };
    if (!record.title || record.end <= record.start) {
      this.error = !record.title ? 'Enter an event title.' : 'End time must be after start time.';
      return;
    }
    this.saved.emit(record);
  }

  reject(message: string): void { this.error = message; }
  close(): void { this.dialog.nativeElement.close(); }

  private newEvent(): LibraryEvent {
    return { guid: crypto.randomUUID(), title: '', weekday: 1, start: '08:00', end: '08:30', color: '#fff2cc' };
  }
  private normalizeColor(color: string): string {
    return /^#[0-9a-f]{3}$/i.test(color) ? '#' + [...color.slice(1)].map(c => c + c).join('') : color;
  }
}



