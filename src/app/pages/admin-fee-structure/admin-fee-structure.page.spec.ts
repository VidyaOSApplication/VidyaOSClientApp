import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminFeeStructurePage } from './admin-fee-structure.page';

describe('AdminFeeStructurePage', () => {
  let component: AdminFeeStructurePage;
  let fixture: ComponentFixture<AdminFeeStructurePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFeeStructurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
