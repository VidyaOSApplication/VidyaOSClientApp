import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnterMarksPage } from './enter-marks.page';

describe('EnterMarksPage', () => {
  let component: EnterMarksPage;
  let fixture: ComponentFixture<EnterMarksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterMarksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
