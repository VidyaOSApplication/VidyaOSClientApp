import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExamDashboardPage } from './exam-dashboard.page';

describe('ExamDashboardPage', () => {
  let component: ExamDashboardPage;
  let fixture: ComponentFixture<ExamDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
