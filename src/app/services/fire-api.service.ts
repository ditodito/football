import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { from, map, Observable, tap } from 'rxjs';
import { AuthService } from '.';
import { TeamBody, TeamBodyWithId } from '../content/models';

@Injectable({
  providedIn: 'root',
})
export class FireApiService {
  constructor(private store: AngularFirestore, private auth: AuthService) {}

  addTeam(teamBody: TeamBody) {
    return from(this.store.collection('teams').add(teamBody));
  }

  getTeams(): Observable<TeamBodyWithId[]> {
    return this.store
      .collection<TeamBody>('teams', (ref) =>
        ref.where('uid', '==', this.auth.userId)
      )
      .get()
      .pipe(
        map<QuerySnapshot<TeamBody>, TeamBodyWithId[]>((res) =>
          res.docs.map((team) => ({ ...team.data(), id: team.id }))
        )
      );
  }

  getTeam(id: string): Observable<TeamBody | undefined> {
    return this.store
      .collection<TeamBody>('teams', (ref) =>
        ref.where('uid', '==', this.auth.userId)
      )
      .doc(id)
      .get()
      .pipe(map((team) => team.data()));
  }

  deleteTeam(id: string): Observable<void> {
    return from(
      this.store
        .collection<TeamBody>('teams', (ref) =>
          ref.where('uid', '==', this.auth.userId)
        )
        .doc(id)
        .delete()
    );
  }
}
