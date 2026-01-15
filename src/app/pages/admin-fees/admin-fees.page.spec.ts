import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminFeesPage } from './admin-fees.page';

describe('AdminFeesPage', () => {
  let component: AdminFeesPage;
  let fixture: ComponentFixture<AdminFeesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFeesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
