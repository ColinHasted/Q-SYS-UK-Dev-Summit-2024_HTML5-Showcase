import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtzCameraComponent } from './ptz-camera.component';

describe('PtzCameraComponent', () => {
  let component: PtzCameraComponent;
  let fixture: ComponentFixture<PtzCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtzCameraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtzCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
