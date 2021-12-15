import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AddTeamComponent } from './add-team/add-team.component';
import { ContentComponent } from './content.component';
import { TeamDetailsComponent } from './team-details/team-details.component';

const route: Route[] = [
  {
    path: '',
    component: ContentComponent,
  },
  {
    path: 'add-team',
    component: AddTeamComponent,
  },
  {
    path: ':id',
    component: TeamDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
