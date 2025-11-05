import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtzCameraWithPreviewComponent } from './ptz-camera-with-preview.component';

describe('PtzCameraWithPreviewComponent', () => {
  let component: PtzCameraWithPreviewComponent;
  let fixture: ComponentFixture<PtzCameraWithPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtzCameraWithPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtzCameraWithPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
