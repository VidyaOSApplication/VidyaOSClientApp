import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterSchoolPage } from './register-school.page';

describe('RegisterSchoolPage', () => {
  let component: RegisterSchoolPage;
  let fixture: ComponentFixture<RegisterSchoolPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSchoolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
