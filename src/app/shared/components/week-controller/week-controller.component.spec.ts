import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekControllerComponent } from './week-controller.component';

describe('WeekControllerComponent', () => {
  let component: WeekControllerComponent;
  let fixture: ComponentFixture<WeekControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
