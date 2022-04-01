import { TestBed } from '@angular/core/testing';

import { HardwareListService } from './hardware-list.service';

describe('HardwareListService', () => {
  let service: HardwareListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardwareListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
