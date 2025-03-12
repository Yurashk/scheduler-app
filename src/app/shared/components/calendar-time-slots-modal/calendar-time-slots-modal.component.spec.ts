import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTimeSlotsModalComponent } from './calendar-time-slots-modal.component';

describe('CalendarTimeSlotsModalComponent', () => {
  let component: CalendarTimeSlotsModalComponent;
  let fixture: ComponentFixture<CalendarTimeSlotsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarTimeSlotsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarTimeSlotsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
