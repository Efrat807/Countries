import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CountryReducer } from './states/country/country.reducer';
import { provideHttpClient } from '@angular/common/http';
import { CountryEffect } from './states/country/country.effect';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideStore(),
		provideEffects(),
		provideState({ name: 'country', reducer: CountryReducer }),
		provideEffects(CountryEffect),
		provideHttpClient(), provideAnimationsAsync(),
	],
};
