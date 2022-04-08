import { Directive } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { HardwareFormComponent } from './hardware-form.component';

@Directive({ selector: 'submitAction' })
class SubmitActionDirective {}

describe('HardwareFormComponent', () => {
  let component: HardwareFormComponent;
  let fixture: ComponentFixture<HardwareFormComponent>;
  let componentElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HardwareFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareFormComponent);
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement;
    component.formTitle = 'test title';
    component.submitAction = (hardwareData) => hardwareData;
    component.submitButtonText = 'test button text';
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with proper form title', () => {
    const h1 = componentElement.querySelector('h1');
    expect(h1?.textContent).toBe('test title');
  });

  it('should render with proper button text', () => {
    const button = componentElement.querySelector('input[type="submit"]') as HTMLInputElement;
    expect(button?.value).toBe('test button text');
  });

  it('should not call submitAction on button click when form is empty', () => {
    const button = componentElement.querySelector('input[type="submit"]') as HTMLInputElement;
    spyOn(component, 'submitAction');
    button.click();
    expect(component.submitAction).not.toHaveBeenCalled();
  })

  it('should form be prefilled', () => {
    component.prefilledHardwareData = {category: 'inne', description: 'test description', name: 'test name', price: 123}
    component.ngOnInit()

    fixture.detectChanges();
    expect(component.hardwareData.value).toEqual(component.prefilledHardwareData);
  })
});
