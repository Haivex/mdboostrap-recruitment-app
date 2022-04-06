import { TestBed } from '@angular/core/testing';
import { HardwareData } from './hardware-form/hardware-form.component';
import { HardwareListService, HardwareRecord } from './hardware-list.service';

describe('HardwareListService', () => {
  let service: HardwareListService;
  let hardwareData: HardwareData = {
    category: 'audio',
    description: '',
    name: 'Headphones',
    price: 123.45,
  };
  let hardwareRecord: HardwareRecord = {
    id: 123456,
    ...hardwareData,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardwareListService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('hardwareList should be empty', () => {
    expect(service.get()).toEqual([]);
  });

  it('should add hardware', () => {
    let id = new Date().getTime();
    service.add(hardwareData);
    expect(service.get()).toHaveSize(1);
    expect(service.get()[0].id).toBeGreaterThanOrEqual(id);
  });

  it('should get data from localStorage', () => {
    TestBed.resetTestingModule();
    localStorage.setItem('table', JSON.stringify([hardwareRecord]));
    service = TestBed.inject(HardwareListService);
    expect(service.get()).toHaveSize(1);
    expect(service.get()[0].name).toBe('Headphones');
    expect(service.get()[0].id).toBe(123456);
  });

  it('should edit data', () => {
    TestBed.resetTestingModule();
    localStorage.setItem('table', JSON.stringify([hardwareRecord]));
    service = TestBed.inject(HardwareListService);
    expect(service.get()[0].name).toBe('Headphones');
    service.edit(123456, { name: 'wireless headphones' });
    expect(service.get()[0].name).toBe('wireless headphones');
  });

  it('should get data by category', () => {
    service.add(hardwareData);
    expect(service.get('wrong category')).toHaveSize(0);
    expect(service.get('audio')).toHaveSize(1);
  });

  it('should remove record', () => {
    TestBed.resetTestingModule();
    localStorage.setItem('table', JSON.stringify([hardwareRecord]));
    service = TestBed.inject(HardwareListService);
    expect(service.get()).toHaveSize(1);
    service.remove(123456);
    expect(service.get()).toHaveSize(0);
  });

  it('should add category', () => {
    service.addCategory('new category');
    service.addCategory('category2');
    expect(service.additionalCategories).toContain('new category');
    expect(service.additionalCategories).toContain('category2');
  });

  it('should set current edited record', () => {
    TestBed.resetTestingModule();
    localStorage.setItem('table', JSON.stringify([hardwareRecord]));
    service = TestBed.inject(HardwareListService);
    service.setCurrentEdited(hardwareRecord);
    expect(service.currentEdited).toBe(hardwareRecord);
  });

  it('should call subscribers', () => {
    spyOn(service.currentEditedChange, 'next');
    service.setCurrentEdited(hardwareRecord);
    expect(service.currentEditedChange.next).toHaveBeenCalledWith(
      hardwareRecord
    );
    spyOn(service.hardwareListChange, 'next');
    service.add(hardwareData);
    expect(service.hardwareListChange.next).toHaveBeenCalledWith(
      service['hardwareList']
    );
  });
});
