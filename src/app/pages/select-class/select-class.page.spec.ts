import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectClassPage } from './select-class.page';

describe('SelectClassPage', () => {
  let component: SelectClassPage;
  let fixture: ComponentFixture<SelectClassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
