import { InjectionToken } from '@angular/core';
import { AppConfig } from './models/config.model';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const TODO_CONFIG: AppConfig = {
  apiEndpoint: 'http://localhost:3000',
};
