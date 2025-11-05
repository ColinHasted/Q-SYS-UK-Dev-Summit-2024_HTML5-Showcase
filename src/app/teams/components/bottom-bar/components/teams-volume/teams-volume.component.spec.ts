import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsVolumeComponent } from './teams-volume.component';

describe('TeamsVolumeComponent', () => {
  let component: TeamsVolumeComponent;
  let fixture: ComponentFixture<TeamsVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsVolumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
