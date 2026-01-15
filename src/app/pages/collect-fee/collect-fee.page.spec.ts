import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectFeePage } from './collect-fee.page';

describe('CollectFeePage', () => {
  let component: CollectFeePage;
  let fixture: ComponentFixture<CollectFeePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectFeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
