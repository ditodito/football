import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Langs } from 'src/app/model/Enums';
import { AuthService, LangStorageService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  langs = Langs;

  get isLoggedIn() {
    return this.auth.isLoggedIn;
  }

  constructor(
    private translate: TranslateService,
    private langStorageService: LangStorageService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang(this.langStorageService.get());
  }

  onChangeLang(lang: string) {
    this.translate.setDefaultLang(lang);
    this.langStorageService.set(lang);
  }

  onSignOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['sign-in']);
    });
  }
}
