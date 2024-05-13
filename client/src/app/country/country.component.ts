import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { CountryApiService } from '../shared/services/CountryApi.service';
import { Observable } from 'rxjs';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';

@Component({
	selector: 'app-country',
	standalone: true,
	imports: [
		AsyncPipe,
		MatTableModule,
		EditCountryComponent,
		MatButtonModule,
		MatIconModule,
		MatPaginatorModule,
		MatSortModule,
	],
	templateUrl: './country.component.html',
	styleUrl: './country.component.scss',
	providers: [HttpClient],
})
export class CountryComponent {
	// http = inject(HttpClient);
	// countryApi = inject(CountryApiService);
	countries$!: Observable<ICountry[]>;
	columnsToDisplay = [
		'name',
		'capital',
		'region',
		'subRegion',
		'population',
		'>',
	];
	// clickedRows = new Set<ICountry>();

	constructor(private store: Store, private router: Router) {
		this.store.dispatch(CountryActions.loadCountry());
		this.countries$! = this.store.select(CountrySelector.selectAllCountries);
	}

	onButtonClick(country: ICountry) {
		// const url = `/editCountry/${country.id}`;
		// const newTab = window.open(url, '_blank');
		// newTab?.focus();
		this.router.navigate(['/editCountry', country.id]);
	}
}
