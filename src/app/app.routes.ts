import { Routes } from '@angular/router';

import { TeamsComponent } from './teams/teams.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: SplashScreenComponent },
  { path: 'teams', component: TeamsComponent },
  { path: '*', component: SplashScreenComponent },
];
