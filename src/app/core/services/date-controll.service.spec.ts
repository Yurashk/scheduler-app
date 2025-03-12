import { TestBed } from '@angular/core/testing';

import { DateControllService } from './date-controll.service';

describe('DateControllService', () => {
  let service: DateControllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateControllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
