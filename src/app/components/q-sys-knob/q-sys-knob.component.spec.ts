import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QSysKnobComponent } from './q-sys-knob.component';

describe('QSysKnobComponent', () => {
  let component: QSysKnobComponent;
  let fixture: ComponentFixture<QSysKnobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QSysKnobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QSysKnobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
