import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withDisabledInitialNavigation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withDisabledInitialNavigation()),
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
