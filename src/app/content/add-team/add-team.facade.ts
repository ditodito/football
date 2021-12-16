import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services';
import { EventBusService } from 'src/app/services/event-bus.service';
import { FireApiService } from 'src/app/services/fire-api.service';
import { ContentFacade } from '../content.facade';
import { FORM_RESET_EVENT_KEY } from '../content.models';
import { Team, TeamBody } from '../models';
import { AddTeamStorage } from './add-team.storage';

@Injectable()
export class AddTeamFacade {
  get searchedTeams(): string[] {
    return this.addTeamStorage.lastSearches;
  }

  constructor(
    private fireApiService: FireApiService,
    private addTeamStorage: AddTeamStorage,
    private contentFacade: ContentFacade,
    private loaderService: LoadingService,
    private eventBus: EventBusService,
    private router: Router
  ) {}

  getTeamByName(teamName: string): Observable<Team> {
    this.loaderService.start();

    return this.contentFacade.getTeamByName(teamName).pipe(
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
    this.fireApiService.addTeam(teamBody).subscribe(() => {
      this.router.navigate(['content']);
    });
  }
}
