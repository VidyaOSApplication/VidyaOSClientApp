import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAttendancePage } from './view-attendance.page';

describe('ViewAttendancePage', () => {
  let component: ViewAttendancePage;
  let fixture: ComponentFixture<ViewAttendancePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
