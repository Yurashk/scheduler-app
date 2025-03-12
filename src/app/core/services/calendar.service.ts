import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Day, Task } from '../interfaces/week-days';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private taskStorage: { [weekKey: string]: Day[] } = {};
  private taskStorageSubject = new BehaviorSubject<{
    [weekKey: string]: Day[];
  }>({});

  constructor() {}

  getTaskStorage() {
    return this.taskStorageSubject.asObservable();
  }

  getWeekTasks(weekKey: string): Day[] {
    return (
      this.taskStorage[weekKey] || this.generateWeekDays(new Date(weekKey))
    );
  }

  saveWeekTasks(weekKey: string, tasks: Day[]) {
    this.taskStorage[weekKey] = tasks.map((day) => ({
      ...day,
      tasks: day.tasks.map((slot: Task[]) => [...slot]),
    }));
    this.taskStorageSubject.next(this.taskStorage);
  }

  generateWeekDays(startDate: Date): Day[] {
    let days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(day.getDate() + i);

      days.push({
        name: day.toLocaleDateString('en-US', { weekday: 'short' }),
        date: day.toLocaleDateString('en-US', {
          day: '2-digit',
          month: '2-digit',
        }),
        tasks: Array(23)
          .fill(null)
          .map(() => [{ title: '', description: '' }]),
      });
    }
    return days;
  }

  generateTimeSlots(): string[] {
    let timeSlots: string[] = [];
    for (let i = 1; i < 24; i++) {
      const hour = i % 12 === 0 ? 12 : i % 12;
      const period = i <= 12 ? 'AM' : 'PM';
      timeSlots.push(`${hour} ${period}`);
    }
    return timeSlots;
  }
  generateDropListIds(days:Day[],timeSlots:string[]) {
    let connectedDropLists = [];
    for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
      for (let timeIndex = 0; timeIndex < timeSlots.length; timeIndex++) {
        connectedDropLists.push('dropList-' + dayIndex + '-' + timeIndex);
      }
    }
    return connectedDropLists
  }
}
