import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateControllService {
  private currentWeekStartSubject = new BehaviorSubject<Date>(
    this.getStartOfWeek(new Date()),
  );
  currentWeekStart$ = this.currentWeekStartSubject.asObservable();

  constructor() {}

  updateWeekStart(date: Date): void {
    const newStart = this.getStartOfWeek(date);
    this.currentWeekStartSubject.next(newStart);
  }

  getCurrentWeekStart(): Date {
    return this.currentWeekStartSubject.getValue();
  }

  private getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
}
