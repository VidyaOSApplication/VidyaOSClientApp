import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectStreamPage } from './select-stream.page';

describe('SelectStreamPage', () => {
  let component: SelectStreamPage;
  let fixture: ComponentFixture<SelectStreamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStreamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
