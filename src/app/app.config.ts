import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {routes} from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(MatSnackBarModule),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(BrowserAnimationsModule),

  ],
};
