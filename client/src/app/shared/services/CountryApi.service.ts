import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ICountry } from '../../shared/models/countries.interface';

@Injectable({
	providedIn: 'root',
})
export class CountryApiService {
	http = inject(HttpClient);
	serverUrl = 'https://localhost:7100/Country';
	constructor() {
		provideHttpClient();
	}

	getCountries(): Observable<ICountry[]> {
		// Replace 'your_backend_url' with the actual URL of your backend server endpoint
		return this.http.get<ICountry[]>(this.serverUrl);
	}
	getCountryById(countryId: string) {
		return this.http.get<ICountry>(`${this.serverUrl}/${countryId}`);
	}
	putCountries(country: ICountry) {
		// const updatedCountry = {...country, id}
		console.log(country);

		return this.http.put<ICountry>(this.serverUrl, country);
	}
}
