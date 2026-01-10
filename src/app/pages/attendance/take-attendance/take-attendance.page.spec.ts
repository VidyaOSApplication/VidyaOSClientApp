import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TakeAttendancePage } from './take-attendance.page';

describe('TakeAttendancePage', () => {
  let component: TakeAttendancePage;
  let fixture: ComponentFixture<TakeAttendancePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
