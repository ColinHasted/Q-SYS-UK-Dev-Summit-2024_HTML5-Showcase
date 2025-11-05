import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsalyzerComponent } from './responsalyzer.component';

describe('ResponsalyzerComponent', () => {
  let component: ResponsalyzerComponent;
  let fixture: ComponentFixture<ResponsalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsalyzerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
