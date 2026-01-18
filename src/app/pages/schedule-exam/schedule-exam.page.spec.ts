import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleExamPage } from './schedule-exam.page';

describe('ScheduleExamPage', () => {
  let component: ScheduleExamPage;
  let fixture: ComponentFixture<ScheduleExamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleExamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
