import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SignIn, SignUp } from '../auth/models';


export interface User {
  uid: string | null | undefined;
  email: string | null | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: User | null = null;

  get isLoggedIn(): boolean {
    return !!this._user;
  }

  get userId(): string | null | undefined {
    return this._user?.uid;
  }

  constructor(private auth: AngularFireAuth) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this._user = {
          uid: user.uid,
          email: user.email,
        };

        return;
      }

      this._user = null;
    });
  }

  signUp({ email, password }: SignUp) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn({ email, password }: SignIn) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.auth.signOut();
  }
}
