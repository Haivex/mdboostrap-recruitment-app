import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareCreateFormComponent } from './hardware-create-form.component';

describe('HardwareCreateFormComponent', () => {
  let component: HardwareCreateFormComponent;
  let fixture: ComponentFixture<HardwareCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwareCreateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
