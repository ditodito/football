import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { TeamBody } from '../content/models';

@Injectable({
  providedIn: 'root',
})
export class FireApiService {
  constructor(private store: AngularFirestore) {}

  addTeam(teamBody: TeamBody) {
    return from(this.store.collection('teams').add(teamBody));
  }
}
