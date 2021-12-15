import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { CountryApi, Team, TeamApi, TeamApiResponse } from './models';
import { CountryApiService, TeamApiService } from './services';

@Injectable()
export class ContentFacade {
  constructor(
    private teamApiService: TeamApiService,
    private countryApiService: CountryApiService
  ) {}

  private convertCountryToGB(country: string): string {
    return ['England', 'Scotland', 'Wales', 'Northern Ireland'].includes(
      country
    )
      ? 'United Kingdom'
      : country;
  }

  private mapTeamWithCountry(team: TeamApiResponse, country: CountryApi): Team {
    return {
      id: team.team?.id,
      name: team.team?.name,
      countryName: team.team?.country,
      cityName: team.venue?.city,
      country: {
        name: country.name?.common,
        population: country.population,
        //flagUrl: `https://flagpedia.net/data/flags/icon/36x27/${country.flag}.png`
        flagUrl: country.flags?.png,
      },
      founded: team.team?.founded,
      logoUrl: team.team?.logo,
      stadium: {
        name: team.venue?.name,
        capacity: team.venue?.capacity,
        imageUrl: team.venue?.image,
      },
    };
  }

  getTeamByName(teamName: string): Observable<Team> {
    return this.teamApiService.getTeamByName(teamName).pipe(
      // tap((team) => console.log('team 1', team)),
      map<TeamApi, TeamApiResponse>((team) => team.response[0]),

      switchMap((team) => {
        const country = this.convertCountryToGB(team.team.country);

        return this.countryApiService.getCountryByName(country).pipe(
          // tap((country) => console.log('country', country)),
          map<CountryApi[], Team>((country) =>
            this.mapTeamWithCountry(team, country[0])
          )
        );
      })
    );
  }

  getTeamById(id: number): Observable<Team> {
    return this.teamApiService.getTeamById(id).pipe(
      // tap((team) => console.log('team 1', team)),
      map<TeamApi, TeamApiResponse>((team) => team.response[0]),

      switchMap((team) => {
        const country = this.convertCountryToGB(team.team.country);

        return this.countryApiService.getCountryByName(country).pipe(
          // tap((country) => console.log('country', country)),
          map<CountryApi[], Team>((country) =>
            this.mapTeamWithCountry(team, country[0])
          )
        );
      })
    );
  }
}
