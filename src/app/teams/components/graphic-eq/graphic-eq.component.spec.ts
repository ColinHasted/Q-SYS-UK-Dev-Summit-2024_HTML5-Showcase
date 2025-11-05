import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicEqComponent } from './graphic-eq.component';

describe('GraphicEqComponent', () => {
  let component: GraphicEqComponent;
  let fixture: ComponentFixture<GraphicEqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicEqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicEqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
