import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ContentComponent } from './content.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamListItemComponent } from './team-list/team-list-item/team-list-item.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor, CountryApiService, TeamApiService } from './services';
import { ContentFacade } from './content.facade';

@NgModule({
  declarations: [
    ContentComponent,
    AddTeamComponent,
    TeamListComponent,
    TeamListItemComponent,
    TeamDetailsComponent,
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    TeamApiService,
    CountryApiService,
    ContentFacade,
  ],
})
export class ContentModule {}
