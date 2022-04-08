import { Directive } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareFormComponent);
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement;
    component.formTitle = 'test title';
    component.submitAction = (hardwareData) => hardwareData;
    component.submitButtonText = 'test button text';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with proper form title', () => {
    const h1 = componentElement.querySelector('h1');
    expect(h1?.textContent).toBe('test title');
  });

  it('should render with proper button text', () => {
    const button = componentElement.querySelector(
      'input[type="submit"]'
    ) as HTMLInputElement;
    expect(button?.value).toBe('test button text');
  });

  it('should not call submitAction on button click when form is empty', () => {
    const button = componentElement.querySelector(
      'input[type="submit"]'
    ) as HTMLInputElement;
    spyOn(component, 'submitAction');
    button.click();
    expect(component.submitAction).not.toHaveBeenCalled();
  });

  it('should form be prefilled', () => {
    component.prefilledHardwareData = {
      category: 'inne',
      description: 'test description',
      name: 'test name',
      price: 123,
    };
    component.ngOnInit();

    const inputPrice = componentElement.querySelector(
      'input[id="price"]'
    ) as HTMLInputElement;

    fixture.detectChanges();
    expect(component.hardwareData.value).toEqual(
      component.prefilledHardwareData
    );
    expect(inputPrice.value).toBe('123');
  });

  it('should update form data when user inputs', () => {
    const inputPrice = componentElement.querySelector(
      'input[id="price"]'
    ) as HTMLInputElement;

    inputPrice.value = '1234';
    inputPrice.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(expect(component.hardwareData.value.price).toEqual(1234));
  });

  it('should call submitAction with form data', () => {
    const inputPrice = componentElement.querySelector(
      'input[id="price"]'
    ) as HTMLInputElement;
    const inputName = componentElement.querySelector(
      'input[id="name"]'
    ) as HTMLInputElement;
    const selectCategory = componentElement.querySelector(
      'select[id="category"]'
    ) as HTMLSelectElement;
    const textareaDescription = componentElement.querySelector(
      'textarea'
    ) as HTMLTextAreaElement;
    const button = componentElement.querySelector(
      'input[type="submit"]'
    ) as HTMLInputElement;

    inputPrice.value = '1234';
    inputPrice.dispatchEvent(new Event('input'));

    inputName.value = 'test name2';
    inputName.dispatchEvent(new Event('input'));

    selectCategory.selectedIndex = 1;
    selectCategory.dispatchEvent(new Event('change'));

    textareaDescription.value = 'test description2';
    textareaDescription.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    spyOn(component, 'submitAction');
    button.click();
    button.dispatchEvent(new Event('click'));

    expect(component.submitAction).toHaveBeenCalled();
    expect(component.submitAction).toHaveBeenCalledWith({
      category: 'podzespoły komputera',
      name: 'test name2',
      price: 1234,
      description: 'test description2',
    });
  });

  it('should render additionalCategories', () => {
    component.additionalCategories = ['test category'];
    fixture.detectChanges();

    const optionElement = componentElement.querySelector(
      'option[value="test category"]'
    ) as HTMLOptionElement;
    expect(optionElement.textContent).toBe('test category');
  });

  it('should show error when empty field', () => {
    const inputName = componentElement.querySelector(
      'input[id="name"]'
    ) as HTMLInputElement;
    const errorsElements =
      componentElement.getElementsByClassName('fieldError');

    expect(errorsElements[0]).toBeUndefined();

    inputName.dispatchEvent(new Event('focus'));
    inputName.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(errorsElements[0]).toBeDefined();
  });

  it('button should be disabled when form is wrong or empty and not disabled when all is right', () => {
    const inputPrice = componentElement.querySelector(
      'input[id="price"]'
    ) as HTMLInputElement;

    const button = componentElement.querySelector(
      'input[type="submit"]'
    ) as HTMLInputElement;

    expect(button.disabled).toBeTrue();

    component.prefilledHardwareData = {
      category: 'inne',
      description: 'test description',
      name: 'test name',
      price: 123,
    };
    component.ngOnInit();

    fixture.detectChanges();

    expect(button.disabled).toBeFalse();

    inputPrice.value = '-1234';
    inputPrice.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(button.disabled).toBeTrue();
  });
});
