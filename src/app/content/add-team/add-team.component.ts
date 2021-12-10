import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Country } from '../models';
import { Team } from '../models/team.models';
import { AddTeamFacade } from './add-team.facade';
import { AddTeamStorage } from './add-team.storage';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.sass'],
  providers: [AddTeamFacade, AddTeamStorage],
})
export class AddTeamComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  search: string = '';
  selectedTeam$: Observable<Team> | null = null;
  searchError: boolean = false;

  get searchedTeams(): string[] {
    return this.facade.searchedTeams;
  };

  constructor(private facade: AddTeamFacade) {}

  ngOnInit() {
    this.facade.restoreState();
    this.form.addControl('test', new FormControl('dd'))
  }

  onSearch() {
    this.searchError = false;

    if (!this.search) {
      this.searchError = false;
      return;
    }

    this.facade.addToLastSearches(this.search);
    this.fetchTeam(this.search)
  }

  fetchTeam(team: string) {
    this.selectedTeam$ = this.facade.getTeamByName(team);
  }

  getPopulation({name, population}: Country) {
    return `Population of ${name} is ${population}`;
  }
}
