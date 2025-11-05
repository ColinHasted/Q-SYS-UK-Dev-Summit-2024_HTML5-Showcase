import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametricEqComponent } from './parametric-eq.component';

describe('ParametricEqComponent', () => {
  let component: ParametricEqComponent;
  let fixture: ComponentFixture<ParametricEqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametricEqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametricEqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
