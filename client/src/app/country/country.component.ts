import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, catchError, map, merge, startWith, switchMap } from 'rxjs';
import { ICountry } from '../shared/models/countries.interface';
import { Store } from '@ngrx/store';
import * as CountryActions from '../states/country/country.action';
import * as CountrySelector from '../states/country/country.selector';
import { AsyncPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { EditCountryComponent } from '../edit-country/edit-country.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-country',
	standalone: true,
	imports: [
		AsyncPipe,
		MatTableModule,
		EditCountryComponent,
		MatButtonModule,
		MatIconModule,
	],
	templateUrl: './country.component.html',
	styleUrl: './country.component.scss',
	providers: [HttpClient],
})
export class CountryComponent {
	countries$!: Observable<ICountry[]>;
	columnsToDisplay = [
		'name',
		'capital',
		'region',
		'subRegion',
		'population',
		'>',
	];
	countries: ICountry[] | undefined;

	constructor(private store: Store, private router: Router) {
		this.store.dispatch(CountryActions.loadCountry());
		this.countries$! = this.store.select(CountrySelector.selectAllCountries);
		this.countries$.subscribe(
			(emittedCountries: ICountry[]) => (this.countries = emittedCountries)
		);
	}

	onButtonClick(country: ICountry) {
		this.router.navigate(['/editCountry', country.id]);
	}
}
