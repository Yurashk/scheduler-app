import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationSnackBarComponent } from './information-snack-bar.component';

describe('InformationSnackBarComponent', () => {
  let component: InformationSnackBarComponent;
  let fixture: ComponentFixture<InformationSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationSnackBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
