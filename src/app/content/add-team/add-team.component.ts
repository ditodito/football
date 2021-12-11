import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  get players() {
    return this.form.get('players') as FormArray;
  }

  constructor(private facade: AddTeamFacade, private fb: FormBuilder) {}

  ngOnInit() {
    this.facade.restoreState();
    this.buildForm();
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

  submit() {
    console.log(this.form.valid);
    console.log(this.form.invalid);
    console.log(this.form);

    //this.form.controls['test'].setValue('dito');
    /*this.form.setValue({
      test: 'test 1987'
    })*/
  }

  private buildForm() {
    this.form = this.fb.group({
      website: ['', [Validators.required]],
      wikipedia: ['', [Validators.required]],
      coach: ['', [Validators.required]],
      players: this.fb.array([
        /*this.fb.group({
          position: ['deffender',  [Validators.required]],
          name: ['Gerard Pique',  [Validators.required]]
        }),
        this.fb.group({
          position: ['forward',  [Validators.required]],
          name: ['Ansu Fati',  [Validators.required]]
        })*/
      ])
    });
  }

  addPlayerControl() {
    this.players.push(
      this.fb.group({
        position: ['', [Validators.required]],
        name: ['', [Validators.required]]
      })
    );
  }

  removePlayerControl(index: number) {
    this.players.removeAt(index);
  }
}
