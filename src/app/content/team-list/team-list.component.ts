import { Component, OnInit } from '@angular/core';
import { finalize, forkJoin, map, Observable, switchMap } from 'rxjs';
import { LoadingService } from 'src/app/services';
import { FireApiService } from 'src/app/services/fire-api.service';
import { TeamApi, TeamApiResponse, TeamBodyWithId, TeamListItem } from '../models';
import { TeamApiService } from '../services';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css'],
})
export class TeamListComponent implements OnInit {
  teams$: Observable<TeamListItem[]> | undefined;

  constructor(
    private teamApiService: TeamApiService,
    private fireApiService: FireApiService,
    private loaderService: LoadingService
  ) {}

  private mapTeamData(data: TeamBodyWithId[]) {
    return data.map((d) =>
      this.teamApiService.getTeamById(d.teamId).pipe(
        map<TeamApi, TeamApiResponse>((team) => team.response[0]),
        map<TeamApiResponse, TeamListItem>((teamResponse) => ({
          data: d,
          team: {
            id: teamResponse.team.id,
            name: teamResponse.team.name,
            countryName: teamResponse.team.country,
            cityName: teamResponse.venue.city,
            country: {
              name: '',
              population: 0,
              flagUrl: '',
            },
            founded: teamResponse.team.founded,
            logoUrl: teamResponse.team.logo,
            stadium: {
              name: teamResponse.venue.name,
              capacity: teamResponse.venue.capacity,
              imageUrl: teamResponse.venue.image,
            },
          },
        }))
      )
    );
  }

  ngOnInit() {
    this.loaderService.start();

    this.teams$ = this.fireApiService.getTeams().pipe(
      switchMap((teams) => forkJoin(this.mapTeamData(teams))),
      finalize(() => this.loaderService.end())
    );
  }
}
