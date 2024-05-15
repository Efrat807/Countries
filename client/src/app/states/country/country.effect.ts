import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CountryActions from '../country/country.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { CountryApiService } from '../../shared/services/CountryApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CountryEffect {
	private api = inject(CountryApiService);
	action$ = inject(Actions);

	loadCountries$ = createEffect(() => {
		return this.action$.pipe(
			ofType(CountryActions.loadCountry),
			switchMap(() =>
				this.api.getCountries().pipe(
					map((res) => CountryActions.loadCountrySuccess({ countries: res })),
					catchError((error: { message: string }) =>
						of(
							CountryActions.loadCountryFailed({
								errorMessage: error + ': fail to load countries',
							})
						)
					)
				)
			)
		);
	});

	
}

// @Injectable()
// export class ProductEffect {
// 	private api = inject(CountryApiService);
// 	action$ = inject(Actions);

// 	loadProducts$ = createEffect(() => {
// 		return this.action$.pipe(
// 			ofType(ProductActions.loadProduct),
// 			switchMap(() =>
// 				this.api.getProducts().pipe(
// 					map((res) => ProductActions.loadProductSuccess({ products: res })),
// 					catchError((error: { message: string }) =>
// 						of(
// 							ProductActions.loadProductFailed({
// 								errorMessage: error + ': fail to load products',
// 							})
// 						)
// 					)
// 				)
// 			)
// 		);
// 	});
// }
