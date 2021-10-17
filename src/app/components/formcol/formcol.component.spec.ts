import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcolComponent } from './formcol.component';

describe('FormcolComponent', () => {
  let component: FormcolComponent;
  let fixture: ComponentFixture<FormcolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormcolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormcolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
