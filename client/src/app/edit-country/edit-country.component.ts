import { Component, OnInit, inject } from '@angular/core';
import { ICountry } from '../shared/models/countries.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CountrySelector from '../states/country/country.selector';
import { AsyncPipe } from '@angular/common';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { CountryApiService } from '../shared/services/CountryApi.service';
import * as CountryActions from '../states/country/country.action';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-edit-country',
	standalone: true,
	imports: [
		AsyncPipe,
		ReactiveFormsModule,
		MatFormFieldModule,
		FormsModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
	],
	templateUrl: './edit-country.component.html',
	styleUrl: './edit-country.component.scss',
})
export class EditCountryComponent implements OnInit {
	countries$!: Observable<ICountry[]>;
	country$!: Observable<ICountry | undefined>;
	form!: FormGroup;
	private api = inject(CountryApiService);
	id!: string | null;

	constructor(
		private route: ActivatedRoute,
		private store: Store,
		private fb: FormBuilder,
		private router: Router
	) {
		this.store.dispatch(CountryActions.loadCountry());
		this.countries$ = this.store.select(CountrySelector.selectAllCountries);
	}

	ngOnInit(): void {
		// this.form.get['region'].disable();
		this.id = this.route.snapshot.paramMap.get('id');
		this.country$ = this.countries$.pipe(
			map((countries) => countries.find((country) => country.id === this.id)),
			switchMap((country) => (country ? of(country) : of(undefined)))
		);
		this.country$.subscribe((country) => console.log(country?.name.official));
		this.country$.subscribe(
			(country) =>
				(this.form = this.fb.group({
					commonName: [country?.name.common || '', Validators.required],
					officialName: [country?.name.official || '', Validators.required],
					capital: [country?.capital || '', Validators.required],
					region: [country?.region || '', Validators.required],
					subRegion: [country?.subRegion || '', Validators.required],
					population: [country?.population || '', Validators.required],
					flags: [country?.flags || ''],
				}))
		);
	}

	onSubmit(): void {
		if (this.form.valid) {
			const formValues = this.form.value;
			const updatedCountry = {
				id: this.id || '',
				name: {
					common: formValues.commonName,
					official: formValues.officialName,
				},
				capital: Array.isArray(formValues.capital)
					? formValues.capital
					: formValues.capital.split(','),
				region: formValues.region,
				subRegion: formValues.subRegion,
				population: +formValues.population || 0,
				flags: formValues.flags,
			};
			console.log(updatedCountry);

			this.api
				.putCountries(updatedCountry)
				.subscribe(() => this.router.navigate(['/']));
		}
	}

	onBackButtonClick() {
		this.router.navigate(['/']);
	}
}
