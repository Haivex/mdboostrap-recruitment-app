import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HardwareEditFormComponent } from './hardware-edit-form.component';

describe('HardwareEditFormComponent', () => {
  let component: HardwareEditFormComponent;
  let fixture: ComponentFixture<HardwareEditFormComponent>;
  let componentElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HardwareEditFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    componentElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show form when currentEdited is not null', () => {
    component.currentEditedRecord = {
      category: 'inne',
      price: 123,
      description: '',
      name: 'test',
      id: 123456,
    };
    fixture.detectChanges();

    const formElement = componentElement.querySelector(
      'app-hardware-form'
    ) as HTMLFormElement;

    expect(formElement.offsetParent).toBeTruthy();

    component.currentEditedRecord = null;
    fixture.detectChanges();

    expect(formElement.offsetParent).toBeFalsy();
  });
});
