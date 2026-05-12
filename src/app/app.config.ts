import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';

import { routes } from './app.routes';
import { provideCharts } from 'ng2-charts';
import { environment } from '../environments/environment';
// import { AnalyticsService } from './core/services/analytics.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimations(),
    provideCharts(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideDatabase(() => getDatabase()),
    // AnalyticsService,  // analytics service already uses the @Injectable({ providedIn: 'root' }) decorator, so it doesn't need to be added here
  ],
};
