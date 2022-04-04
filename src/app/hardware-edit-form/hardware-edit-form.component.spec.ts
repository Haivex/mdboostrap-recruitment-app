import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareEditFormComponent } from './hardware-edit-form.component';

describe('HardwareEditFormComponent', () => {
  let component: HardwareEditFormComponent;
  let fixture: ComponentFixture<HardwareEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwareEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
