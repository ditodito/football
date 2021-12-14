import { Injectable } from '@angular/core';
import {
  catchError,
  finalize,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { LoadingService } from 'src/app/services';
import { EventBusService } from 'src/app/services/event-bus.service';
import { FireApiService } from 'src/app/services/fire-api.service';
import { FORM_RESET_EVENT_KEY } from '../content.models';
import {
  CountryApi,
  TeamApiResponse,
  Team,
  TeamApi,
  TeamBody,
} from '../models';
import { TeamApiService, CountryApiService } from '../services';
import { AddTeamStorage } from './add-team.storage';

@Injectable()
export class AddTeamFacade {
  get searchedTeams(): string[] {
    return this.addTeamStorage.lastSearches;
  }

  constructor(
    private teamApiService: TeamApiService,
    private countryApiService: CountryApiService,
    private fireApiService: FireApiService,
    private loaderService: LoadingService,
    private addTeamStorage: AddTeamStorage,
    private eventBus: EventBusService
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
        const country = [
          'England',
          'Scotland',
          'Wales',
          'Northern Ireland',
        ].includes(team.team?.country)
          ? 'United Kingdom'
          : team.team?.country;

        return this.countryApiService.getCountryByName(country).pipe(
          // tap((country) => console.log('country', country)),
          map<CountryApi[], CountryApi>((country) => country[0]),
          // tap((country) => console.log('country', country)),
          map<CountryApi, Team>((country) =>
            this.mapTeamWithCountry(team, country)
          )
        );
      }),

      catchError((d) => {
        console.log('error', d);
        throw 'dddd' + d;
        /*return of(


          {
            id: 0,
            name: '',
            countryName: '',
            cityName: '',
            country: {
              name: '',
              population: 0,
              flagUrl: ''
            },
            founded: 0,
            logoUrl: '',
            stadium: {
              name: '',
              capacity: '',
              imageUrl: '',
            }
          }*/




        //);
      }),

      // tap((team) => console.log('Team', team)),
      finalize(() => {
        this.loaderService.end();
        this.eventBus.emit(FORM_RESET_EVENT_KEY);
      })
    );
  }

  addToLastSearches(key: string): void {
    this.addTeamStorage.addToLastSearches(key);
  }

  restoreState(): void {
    this.addTeamStorage.restoreState();
  }

  submit(teamBody: TeamBody): void {
    this.fireApiService
      .addTeam(teamBody)
      .subscribe((data) => console.log(data));
  }
}
