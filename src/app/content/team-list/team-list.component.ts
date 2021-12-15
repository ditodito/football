import { Component, OnInit } from '@angular/core';
import { finalize, forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { LoadingService } from 'src/app/services';
import { FireApiService } from 'src/app/services/fire-api.service';
import { ContentFacade } from '../content.facade';
import {
  Team,
  TeamApi,
  TeamApiResponse,
  TeamBodyWithId,
  TeamListItem,
} from '../models';
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
    private contentFacade: ContentFacade,
    private fireApiService: FireApiService,
    private loaderService: LoadingService
  ) {}

  private mapTeamData(data: TeamBodyWithId[]) {
    return data.map((data) =>
      this.contentFacade.getTeamById(data.teamId).pipe(
        map<Team, TeamListItem>((team) => ({
          data,
          team
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
