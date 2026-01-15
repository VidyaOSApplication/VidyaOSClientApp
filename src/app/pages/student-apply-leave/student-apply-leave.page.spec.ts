import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentApplyLeavePage } from './student-apply-leave.page';

describe('StudentApplyLeavePage', () => {
  let component: StudentApplyLeavePage;
  let fixture: ComponentFixture<StudentApplyLeavePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentApplyLeavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
