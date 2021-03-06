import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services';
import { EventBusService } from 'src/app/services/event-bus.service';
import {
  FORM_RESET_EVENT_KEY,
  POSITION,
  PositionSelect,
  RATINGS,
} from '../content.models';
import { Country } from '../models';
import { Team, TeamBody } from '../models/team.models';
import { AddTeamFacade } from './add-team.facade';
import { AddTeamStorage } from './add-team.storage';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.sass'],
  providers: [AddTeamFacade, AddTeamStorage],
})
export class AddTeamComponent implements OnInit {
  searchKey: string = '';
  searchHasError: boolean = false;

  selectedTeam$: Observable<Team> | null = null;

  form: FormGroup = new FormGroup({});
  submitted: boolean = false;

  get searchedTeams(): string[] {
    return this.facade.searchedTeams;
  }

  get players() {
    return this.form.get('players') as FormArray;
  }

  get ratings(): number[] {
    return RATINGS;
  }

  get positions(): PositionSelect[] {
    return POSITION;
  }

  private unsubscribe$ = new Subject();

  constructor(
    private facade: AddTeamFacade,
    private fb: FormBuilder,
    private translate: TranslateService,
    private auth: AuthService,
    private eventBus: EventBusService
  ) {}

  ngOnInit() {
    this.facade.restoreState();
    this.buildForm();

    this.eventBus
      .on(FORM_RESET_EVENT_KEY)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.formReset());
  }

  onSearch() {
    if (!this.searchKey) {
      this.searchHasError = true;
      return;
    }

    this.searchHasError = false;
    this.facade.addToLastSearches(this.searchKey);
    this.fetchTeam(this.searchKey);
  }

  fetchTeam(team: string) {
    this.selectedTeam$ = this.facade.getTeamByName(team);
  }

  getPopulation({ name, population }: Country) {
    return this.translate.get('population', {
      country: name,
      population: population,
    });
  }

  submit(selectedTeam: Team) {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const value = this.form.value;

    const teamBody: TeamBody = {
      teamId: selectedTeam.id,
      uid: this.auth.userId,
      website: value.website,
      rating: value.rating,
      isUCLWinner: value.isUCLWinner,
      coach: value.coach,
      players: value.players,
    };

    this.facade.submit(teamBody);
  }

  private buildForm() {
    this.form = this.fb.group({
      website: ['', [Validators.required]],
      rating: 1,
      isUCLWinner: false,
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
      ]),
    });
  }

  private formReset() {
    this.form.reset();
    this.form.updateValueAndValidity();

    this.form.get('website')?.setValue('');
    this.form.get('rating')?.setValue(1);
    this.form.get('isUCLWinner')?.setValue(false);
    this.form.get('coach')?.setValue('');
    this.players.clear();

    this.submitted = false;
  }

  addPlayerControl() {
    this.players.push(
      this.fb.group({
        position: ['', [Validators.required]],
        name: ['', [Validators.required]],
      })
    );
  }

  removePlayerControl(index: number) {
    this.players.removeAt(index);
  }

  getFormArrayElementValidity(index: number, controlName: string) {
    return this.players.controls[index].get(controlName)?.invalid;
  }
}
