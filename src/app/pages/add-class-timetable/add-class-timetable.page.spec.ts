import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddClassTimetablePage } from './add-class-timetable.page';

describe('AddClassTimetablePage', () => {
  let component: AddClassTimetablePage;
  let fixture: ComponentFixture<AddClassTimetablePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassTimetablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
