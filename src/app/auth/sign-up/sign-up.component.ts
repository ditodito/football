import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, from, Subscriber, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SignUp } from '../models';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {

  singUp: SignUp = {
    email: '',
    password: '',
    repeatePassword: ''
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
  }

  onSignUp(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.loadingService.start();

    /*from(this.auth.signUp(this.singUp))
      .pipe(
        tap(d => console.log('t', d)),
        finalize(() => this.loadingService.end()),
        catchError((err, caught) => {
          console.log('eri', err);
          return 'empty';
        })
      )
      .subscribe(
        (result) => { this.router.navigate(['content'])}
      );*/

    this.auth.signUp(this.singUp)
      .then(() => { this.router.navigate(['content']) })
      .finally(() => { this.loadingService.end() })
  }

}
