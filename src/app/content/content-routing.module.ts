import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AddTeamComponent } from './add-team/add-team.component';
import { ContentComponent } from './content.component';

const route: Route[] = [
  {
    path: '',
    component: ContentComponent,
  },
  {
    path: 'add-team',
    component: AddTeamComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
