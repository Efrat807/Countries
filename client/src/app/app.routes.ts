import { Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';

export const routes: Routes = [
	{
		path: '',
		component: CountryComponent,
	},
	{
		path: 'editCountry/:id',
		loadComponent: () =>
			import('./edit-country/edit-country.component').then(
				(c) => c.EditCountryComponent
			),
	},
];
