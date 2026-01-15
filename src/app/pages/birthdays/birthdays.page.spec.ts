import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BirthdaysPage } from './birthdays.page';

describe('BirthdaysPage', () => {
  let component: BirthdaysPage;
  let fixture: ComponentFixture<BirthdaysPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
