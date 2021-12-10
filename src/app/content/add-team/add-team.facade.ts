import { Injectable } from '@angular/core';
import { finalize, map, Observable, switchMap, tap } from 'rxjs';
import { LoadingService } from 'src/app/services';
import { CountryApi, TeamApiResponse, Team, TeamApi } from '../models';
import { TeamApiService, CountryApiService } from '../services';
import { AddTeamStorage } from './add-team.storage';

@Injectable()
export class AddTeamFacade {
  get searchedTeams(): string[] {
    return this.addTeamStorage.lastSearches;
  };

  constructor(
    private teamApiService: TeamApiService,
    private countryApiService: CountryApiService,
    private loaderService: LoadingService,
    private addTeamStorage: AddTeamStorage,
  ) {}

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

  getTeamByName(team: string): Observable<Team> {
    this.loaderService.start();

    return this.teamApiService.getTeamByName(team).pipe(
      // tap((team) => console.log('team 1', team)),
      map<TeamApi, TeamApiResponse>((team) => team.response[0]),
      // tap((team) => console.log('team 2', team)),

      switchMap((team) => {
        const country = ['England', 'Scotland', 'Wales', 'Northern Ireland'].includes(team.team?.country)
          ? 'United Kingdom'
          : team.team?.country;

        return this.countryApiService.getCountryByName(country).pipe(
          // tap((country) => console.log('country', country)),
          map<CountryApi[], CountryApi>((country) => country[0]),
          // tap((country) => console.log('country', country)),
          map<CountryApi, Team>((country) => this.mapTeamWithCountry(team, country))
        );
      }),

      // tap((team) => console.log('Team', team)),
      finalize(() => this.loaderService.end())
    );
  }

  addToLastSearches(key: string): void {
    this.addTeamStorage.addToLastSearches(key);
  }

  restoreState(): void {
    this.addTeamStorage.restoreState();
  }
}
