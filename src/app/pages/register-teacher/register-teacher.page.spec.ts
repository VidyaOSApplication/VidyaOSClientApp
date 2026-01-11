import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterTeacherPage } from './register-teacher.page';

describe('RegisterTeacherPage', () => {
  let component: RegisterTeacherPage;
  let fixture: ComponentFixture<RegisterTeacherPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTeacherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
