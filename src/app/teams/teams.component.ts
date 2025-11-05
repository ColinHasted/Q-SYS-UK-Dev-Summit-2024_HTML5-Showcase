import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';

import { SupportComponent } from './components/support/support.component';
import { FadeInOutAnimation } from '../animations/animations';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ResponsalyzerComponent } from './components/responsalyzer/responsalyzer.component';
import { LightingComponent } from './components/lighting/lighting.component';
import { ParametricEqComponent } from './components/parametric-eq/parametric-eq.component';

import { DisplaysComponent } from './components/displays/displays.component';
import { PtzCameraWithPreviewComponent } from "./components/ptz-camera-with-preview/ptz-camera-with-preview.component";
import { GraphicEqComponent } from "./components/graphic-eq/graphic-eq.component";
import { ClimateComponent } from './components/climate/climate.component';
import { Router } from '@angular/router';

export enum Popup {
  camera,
  lighting,
  audio_graphic_eq,
  audio_parametric_eq,
  audio_responsalyzer,
  displays,
  climate,
}

@Component({
    selector: 'app-teams',
    imports: [
        BottomBarComponent,
        SupportComponent,
        PtzCameraWithPreviewComponent,
        MainMenuComponent,
        ResponsalyzerComponent,
        DisplaysComponent,
        ClimateComponent,
        LightingComponent,
        ParametricEqComponent,
        PtzCameraWithPreviewComponent,
        ResponsalyzerComponent,
        GraphicEqComponent
    ],
    templateUrl: './teams.component.html',
    styleUrl: './teams.component.scss',
    animations: [FadeInOutAnimation]
})
export class TeamsComponent implements OnInit, OnDestroy {
  readonly router = inject(Router);
  timerHandle: any;
  mainMenuTimerHandle: any;
  supportModal = signal(false);
  Popup = Popup;
  mainMenuActive = signal(false);
  
  CurrentPopup = signal(Popup.camera);

  ngOnInit(): void {}

  ngOnDestroy(): void {
    window.clearTimeout(this.timerHandle);
  }
  /** Hides the custom project and returns to the default Teams view. */
  HideProject(): void {
    this.router.navigate(['home'], { skipLocationChange: true });

  }

  helpRequest(): void {
    this.timerHandle = window.setTimeout(() => this.clearHelpRequest(), 30000);
    this.supportModal.set(true);
  }

  clearHelpRequest(): void {
    window.clearTimeout(this.timerHandle);
    this.supportModal.set(false);
  }

  showPopup(popup: Popup): void {
    this.CurrentPopup.set(popup);
  }

  toggleMenuPopup(): void {
    if(this.mainMenuActive()) {
      this.clearMenuPopup()
    }
    else {
     this.showMenuPopup();
    }
  }

  showMenuPopup(): void {
    window.clearTimeout(this.mainMenuTimerHandle);
    this.mainMenuActive.set(true);
      this.mainMenuTimerHandle = window.setTimeout(() => this.mainMenuActive.set(false), 10000);
  }
  
  clearMenuPopup(): void {
    window.clearTimeout(this.mainMenuTimerHandle);
    this.mainMenuActive.set(false);
  }
}
