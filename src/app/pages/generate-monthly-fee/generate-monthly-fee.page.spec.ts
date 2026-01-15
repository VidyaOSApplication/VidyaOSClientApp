import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerateMonthlyFeePage } from './generate-monthly-fee.page';

describe('GenerateMonthlyFeePage', () => {
  let component: GenerateMonthlyFeePage;
  let fixture: ComponentFixture<GenerateMonthlyFeePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateMonthlyFeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
