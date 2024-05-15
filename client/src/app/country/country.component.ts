import { HttpClient } from '@angular/common/http';
import {
	AfterViewInit,
	Component,
	OnInit,
	ViewChild,
	inject,
} from '@angular/core';
import { CountryApiService } from '../shared/services/CountryApi.service';
import { Observable, catchError, map, merge, startWith, switchMap } from 'rxjs';
import { ICountry } from '../shared/models/countries.interface';
import { Store } from '@ngrx/store';
import * as CountryActions from '../states/country/country.action';
import * as CountrySelector from '../states/country/country.selector';
import { AsyncPipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EditCountryComponent } from '../edit-country/edit-country.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

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
export class CountryComponent implements OnInit {
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
	resultsLength = 0;
	isRateLimitReached = false;
	dataSource: MatTableDataSource<ICountry> | undefined;
	// @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort | undefined;

	// @ViewChild(MatPaginator) paginator: MatPaginator;
	// @ViewChild(MatSort) sort: MatSort;

	constructor(
		private store: Store,
		private router: Router,
		private _liveAnnouncer: LiveAnnouncer
	) {
		this.store.dispatch(CountryActions.loadCountry());
		this.countries$! = this.store.select(CountrySelector.selectAllCountries);
		this.countries$.subscribe(
			(emittedCountries: ICountry[]) => (this.countries = emittedCountries)
		);
	}
	ngOnInit(): void {
		this.dataSource = new MatTableDataSource<ICountry>(this.countries);
		if (this.dataSource && this.sort) {
			this.dataSource.sort = this.sort;
		}
	}
	// ngAfterViewInit() {
	// 	if(this.dataSource?.sort) this.dataSource?.sort = this.sort;
	// }
	onButtonClick(country: ICountry) {
		this.router.navigate(['/editCountry', country.id]);
	}
	announceSortChange(sortState: Sort) {
		// This example uses English messages. If your application supports
		// multiple language, you would internationalize these strings.
		// Furthermore, you can customize the message to add additional
		// details about the values being sorted.
		if (sortState.direction) {
			this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this._liveAnnouncer.announce('Sorting cleared');
		}
	}
}
