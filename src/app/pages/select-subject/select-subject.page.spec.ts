import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectSubjectPage } from './select-subject.page';

describe('SelectSubjectPage', () => {
  let component: SelectSubjectPage;
  let fixture: ComponentFixture<SelectSubjectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSubjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
