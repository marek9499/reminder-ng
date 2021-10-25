import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlabelComponent } from './formlabel.component';

describe('FormlabelComponent', () => {
  let component: FormlabelComponent;
  let fixture: ComponentFixture<FormlabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
