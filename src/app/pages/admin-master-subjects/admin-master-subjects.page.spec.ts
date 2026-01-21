import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMasterSubjectsPage } from './admin-master-subjects.page';

describe('AdminMasterSubjectsPage', () => {
  let component: AdminMasterSubjectsPage;
  let fixture: ComponentFixture<AdminMasterSubjectsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMasterSubjectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
