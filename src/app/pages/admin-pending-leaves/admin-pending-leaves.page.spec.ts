import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPendingLeavesPage } from './admin-pending-leaves.page';

describe('AdminPendingLeavesPage', () => {
  let component: AdminPendingLeavesPage;
  let fixture: ComponentFixture<AdminPendingLeavesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPendingLeavesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
