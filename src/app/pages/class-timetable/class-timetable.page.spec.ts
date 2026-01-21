import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassTimetablePage } from './class-timetable.page';

describe('ClassTimetablePage', () => {
  let component: ClassTimetablePage;
  let fixture: ComponentFixture<ClassTimetablePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassTimetablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
