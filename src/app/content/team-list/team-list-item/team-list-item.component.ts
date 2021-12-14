import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamListItem } from '../../models';

@Component({
  selector: 'app-team-list-item',
  templateUrl: './team-list-item.component.html',
  styleUrls: ['./team-list-item.component.css'],
})
export class TeamListItemComponent implements OnInit {
  @Input() team: TeamListItem | undefined;

  constructor(private router: Router) {}

  ngOnInit() {}

  goToDetails() {
    this.router.navigate([`content/${this.team?.data.id}`]);
  }
}
