import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';

@Component({
	selector: 'app-country',
	standalone: true,
	imports: [
		AsyncPipe,
		MatTableModule,
		EditCountryComponent,
		MatButtonModule,
		MatIconModule,
		MatSortModule,
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
	error$!: Observable<string | null>;
	@ViewChild(MatSort) sort!: MatSort;
	sortedData!: ICountry[];
	countries!: ICountry[];

	constructor(private store: Store, private router: Router) {
		this.store.dispatch(CountryActions.loadCountry());
		this.countries$! = this.store.select(CountrySelector.selectAllCountries);
		this.countries$.subscribe((emittedCountries: ICountry[]) => {
			this.countries = emittedCountries?.slice();
			this.sortedData = this.countries?.slice();
		});
		this.error$ = this.store.select(CountrySelector.selectCountryFail);
	}

	onButtonClick(country: ICountry) {
		this.router.navigate(['/editCountry', country.id]);
	}

	sortData(sort: Sort) {
		const data = this.countries?.slice();
		if (!sort.active || sort.direction === '') {
			this.sortedData = data;
			return;
		}

		this.sortedData = data?.sort((a, b) => {
			const isAsc = sort.direction === 'asc';
			switch (sort.active) {
				case 'name':
					return this.compare(a.name.common, b.name.common, isAsc);
				case 'capital':
					return this.compare(
						a.capital ? a.capital[0] : '',
						b.capital ? b.capital[0] : '',
						isAsc
					);
				case 'region':
					return this.compare(a.region, b.region, isAsc);
				case 'subRegion':
					return this.compare(a.subRegion || '', b.subRegion || '', isAsc);
				case 'population':
					return this.compare(a.population, b.population, isAsc);
				default:
					return 0;
			}
		});
	}
	compare(a: number | string, b: number | string, isAsc: boolean) {
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}

	clickedRow(row: ICountry) {
		console.log(`row: ${row}`);
		
	}
}
