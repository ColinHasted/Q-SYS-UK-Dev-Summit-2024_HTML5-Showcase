import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowShadeComponent } from './window-shade.component';

describe('WindowShadeComponent', () => {
  let component: WindowShadeComponent;
  let fixture: ComponentFixture<WindowShadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowShadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowShadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
