import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, from, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SignIn } from '../models';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
})
export class SignInComponent implements OnInit {
  singIn: SignIn = {
    email: '',
    password: '',
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private loadingService: LoadingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSignIn(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.loadingService.start();

    /*from(this.auth.signIn(this.singIn)).pipe(
      switchMap((data) => this.auth.signIn(this.singIn)),
      finalize(() => this.loadingService.end())
    )*/
    //.then(() => { this.router.navigate(['content']) })
    //.catch((error) => { console.log(error) })
    //.finally(() => { this.loadingService.end() })

    this.auth
      .signIn(this.singIn)
      .then(() => {
        this.router.navigate(['content']);
      })
      .catch((error) => {
        this.toastr.info(error, '', {
          positionClass: 'toast-top-center',
        });
      })
      .finally(() => {
        this.loadingService.end();
      });
  }
}
