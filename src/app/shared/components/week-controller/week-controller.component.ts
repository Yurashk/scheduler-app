import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateControllService } from '../../../core';




@Component({
  selector: 'app-week-controller',
  imports: [],
  templateUrl: './week-controller.component.html',
  styleUrl: './week-controller.component.scss',
})
export class WeekControllerComponent {
  currentWeekStart!: Date;
  private subscription!: Subscription;

  constructor(private dateControllService: DateControllService) {}

  ngOnInit(): void {
    this.subscription = this.dateControllService.currentWeekStart$.subscribe(
      (date) => {
        this.currentWeekStart = date;
      },
    );
  }
  previousWeek(): void {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.dateControllService.updateWeekStart(this.currentWeekStart);
  }

  nextWeek(): void {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.dateControllService.updateWeekStart(this.currentWeekStart);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
