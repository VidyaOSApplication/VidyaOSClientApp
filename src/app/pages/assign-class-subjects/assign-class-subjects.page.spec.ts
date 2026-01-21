import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignClassSubjectsPage } from './assign-class-subjects.page';

describe('AssignClassSubjectsPage', () => {
  let component: AssignClassSubjectsPage;
  let fixture: ComponentFixture<AssignClassSubjectsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignClassSubjectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
