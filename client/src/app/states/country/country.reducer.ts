import { createReducer, on } from '@ngrx/store';
import { ICountry } from '../../shared/models/countries.interface';
import * as CountryActions from './country.action';

export interface CountryState {
	countries: ICountry[];
	error: string | null;
}

export const initialCountryState: CountryState = {
	countries: [],
	error: null,
};

export const CountryReducer = createReducer(
	initialCountryState,
	on(CountryActions.loadCountrySuccess, (state, { countries }) => ({
		...state,
		countries,
		error: null,
	})),
	on(CountryActions.loadCountryFailed, (state, { errorMessage }) => ({
		...state,
		error: errorMessage.toString(),
	}))
);
