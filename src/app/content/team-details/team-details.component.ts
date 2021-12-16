import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services';
import { FireApiService } from 'src/app/services/fire-api.service';
import { ContentFacade } from '../content.facade';
import { Team, TeamBody, TeamBodyWithId } from '../models';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css'],
})
export class TeamDetailsComponent implements OnInit {
  data$: Observable<TeamBody | undefined> | undefined;
  team$: Observable<Team> | undefined;
  id: string = '';

  constructor(
    private activatedRout: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService,
    private fireApiService: FireApiService,
    private contentFacade: ContentFacade
  ) {}

  ngOnInit() {
    this.intitTeamDetails();
  }

  intitTeamDetails() {
    this.id = this.activatedRout.snapshot.params['id'];

    this.loadingService.start();

    this.data$ = this.fireApiService.getTeam(this.id).pipe(
      tap((storeData) => {
        if (storeData) {
          this.team$ = this.contentFacade
            .getTeamById(storeData.teamId)
            .pipe(finalize(() => this.loadingService.end()));
        }
      })
    );
  }

  goBack() {
    this.router.navigate(['content']);
  }

  deleteTeam() {
    this.loadingService.start();

    this.fireApiService
      .deleteTeam(this.id)
      .pipe(finalize(() => this.loadingService.end()))
      .subscribe(() => this.goBack());
  }
}
