import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import {
  AuthInterceptor,
  LoaderHttpInterceptor,
  LoginInterceptor,
} from './interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      })
    ),
    provideHttpClient(
      withInterceptors([
        AuthInterceptor,
        LoginInterceptor,
        LoaderHttpInterceptor,
      ])
    ),
    provideExperimentalZonelessChangeDetection(),
  ],
};
