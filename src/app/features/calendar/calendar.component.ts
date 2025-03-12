import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { CalendarTimeSlotsModalComponent } from '../../shared/components/calendar-time-slots-modal/calendar-time-slots-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, tap } from 'rxjs';

import { WeekControllerComponent } from '../../shared/components/week-controller/week-controller.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InformationSnackBarComponent } from '../../shared/components/information-snack-bar/information-snack-bar.component';
import { CalendarService, DateControllService, Day, Task } from '../../core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    DragDropModule,
    WeekControllerComponent,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [CalendarService,DateControllService],
})
export class CalendarComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  currentWeekStart!: Date;
  private subscriptions: Subscription = new Subscription();
  days: Day[] = [];
  timeSlots: string[] = [];
  connectedDropLists: string[] = [];
  activeDropTarget: { dayIndex: number; timeIndex: number } | null = null;

  constructor(
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private calendarService: CalendarService,
    private dateControllService: DateControllService,
    
  ) { this.currentWeekStart = this.dateControllService.getCurrentWeekStart();}

  ngOnInit() {
    this.subscriptions.add(
      this.calendarService.getTaskStorage().subscribe((taskStorage) => {
        this.subscriptions.add(
          this.dateControllService.currentWeekStart$
            .pipe(tap(() => this.loadWeek()))
            .subscribe((date) => {
              this.currentWeekStart = date;
            })
        );

        this.days = taskStorage[this.getWeekKey()] || [];
        if (!this.days.length) {
          this.days = this.calendarService.generateWeekDays(this.currentWeekStart);
        }
      })
    );
    console.log(this.currentWeekStart);
    this.loadWeek();
    this.timeSlots = this.calendarService.generateTimeSlots();
    this.connectedDropLists=this.calendarService.generateDropListIds(this.days,this.timeSlots);
    
  }

  getWeekKey(): string {
    return this.currentWeekStart.toISOString().split('T')[0];
  }

  saveCurrentWeek() {

    this.calendarService.saveWeekTasks(this.getWeekKey(), this.days);
  }

  loadWeek() {
    this.days = this.calendarService.getWeekTasks(this.getWeekKey()).map((day) => ({
      ...day,
      tasks: day.tasks.map((slot: Task[] | null) =>
        Array.isArray(slot) ? slot : [],
      ),
    }));
  }
  openEventDialog(dayIndex: number, timeIndex: number) {
    const existingTask = this.days[dayIndex].tasks[timeIndex]?.[0];
    const dialogRef = this.dialog.open(CalendarTimeSlotsModalComponent, {
      width: '400px',
      data: {
        day: this.days[dayIndex].name,
        time: this.timeSlots[timeIndex],
        task: existingTask ? { ...existingTask } : { title: '', description: '' },
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.delete) {
        this.days[dayIndex].tasks[timeIndex] = [];
        this.saveCurrentWeek();
        this._snackBar.openFromComponent(InformationSnackBarComponent, {
          duration: 2000,
          data: { message: `Task deleted!` }
        });
      } else if (result) {
        this.days[dayIndex].tasks[timeIndex] = [result];
        this.saveCurrentWeek();
        this._snackBar.openFromComponent(InformationSnackBarComponent, {
          duration: 2000,
          data: { message: `Task "${result.title}" updated!` }
        });
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>, dayIndex: number, timeIndex: number) {
    if (!event.previousContainer.data.length) return;

    const match = event.previousContainer.id.match(/dropList-(\d+)-(\d+)/);
    if (!match) return;
    const [_, prevDayIndex, prevTimeIndex] = match.map(Number);

    if (!this.days[prevDayIndex].tasks[prevTimeIndex][0]?.title) return;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.days[dayIndex].tasks[timeIndex] = [...this.days[prevDayIndex].tasks[prevTimeIndex]];
      this.days[prevDayIndex].tasks[prevTimeIndex] = [];
    }

    this.saveCurrentWeek();
    this.cdr.detectChanges();
    this.activeDropTarget = null;
    this._snackBar.openFromComponent(InformationSnackBarComponent, {
      duration: 1000,
      data: { message: `Moved to ${this.days[dayIndex].name} ${this.days[dayIndex].date}` }
    });
  }

  onDragEnter(dayIndex: number, timeIndex: number) {
    this.activeDropTarget = { dayIndex, timeIndex };
  }

  onDragExit(dayIndex: number, timeIndex: number) {
    if (
      this.activeDropTarget?.dayIndex === dayIndex &&
      this.activeDropTarget?.timeIndex === timeIndex
    ) {
      this.activeDropTarget = null;
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
