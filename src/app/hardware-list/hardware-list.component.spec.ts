import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HardwareRecord } from '../hardware-list.service';
import { HardwareListComponent } from './hardware-list.component';

describe('HardwareListComponent', () => {
  let component: HardwareListComponent;
  let fixture: ComponentFixture<HardwareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HardwareListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sum price', () => {
    let element1: HardwareRecord = {
      category: 'inne',
      price: 1,
      name: 'test',
      description: '',
      id: 123,
    };
    let element2: HardwareRecord = {
      category: 'inne',
      price: 0.1,
      name: 'test',
      description: '',
      id: 123,
    };
    let element3: HardwareRecord = {
      category: 'inne',
      price: 3.78,
      name: 'test',
      description: '',
      id: 123,
    };
    component.hardwareList = [element1, element2, element3];

    expect(component.sumPrices()).toBe('4.88');
  });

  it('should has 3 positions', () => {
    let element1: HardwareRecord = {
      category: 'inne',
      price: 1,
      name: 'test',
      description: '',
      id: 123,
    };
    let element2: HardwareRecord = {
      category: 'inne',
      price: 0.1,
      name: 'test',
      description: '',
      id: 123,
    };
    let element3: HardwareRecord = {
      category: 'inne',
      price: 3.78,
      name: 'test',
      description: '',
      id: 123,
    };
    component.hardwareList = [element1, element2, element3];

    expect(component.getNumberOfPositions()).toBe(3);
  });

  it('should sort by category ascending and descending properly', () => {
    let element1: HardwareRecord = {
      category: 'inne',
      price: 1,
      name: 'A test',
      description: '',
      id: 123,
    };
    let element2: HardwareRecord = {
      category: 'audio',
      price: 0.1,
      name: 'B test',
      description: '',
      id: 123,
    };
    let element3: HardwareRecord = {
      category: 'inne',
      price: 3.78,
      name: 'Z test',
      description: '',
      id: 123,
    };
    component.hardwareList = [element1, element2, element3];

    component.orderBy('price');
    expect(component.hardwareList[0]).toBe(element2);

    component.orderBy('name');
    expect(component.hardwareList[0]).toBe(element1);

    component.orderByReverse('category');
    expect(component.hardwareList[2]).toBe(element2);

    component.orderByReverse('price');
    expect(component.hardwareList[0]).toBe(element3);
  });
});
