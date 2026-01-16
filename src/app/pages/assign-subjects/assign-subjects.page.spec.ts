import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignSubjectsPage } from './assign-subjects.page';

describe('AssignSubjectsPage', () => {
  let component: AssignSubjectsPage;
  let fixture: ComponentFixture<AssignSubjectsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSubjectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
