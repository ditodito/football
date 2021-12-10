import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ContentComponent } from './content.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor, CountryApiService, TeamApiService } from './services';

@NgModule({
  declarations: [
    ContentComponent,
    AddTeamComponent,
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
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    TeamApiService,
    CountryApiService,
  ]
})
export class ContentModule {}
