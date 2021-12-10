import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountryApi } from '../models';

@Injectable()
export class CountryApiService {
  constructor(private http: HttpClient) {}

  getCountryByName(country: string): Observable<CountryApi[]> {
    return this.http.get<CountryApi[]>(`${environment.countryAPI}/name/${country}?fullText=true`);
  }
}
