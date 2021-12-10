import { Injectable } from '@angular/core';
import { StorageService } from '.';
import { Langs } from '../model/Enums';

const LANG = 'lang';

@Injectable({
  providedIn: 'root',
})
export class LangStorageService {
  constructor(private storage: StorageService) {}

  get(): string {
    return this.storage.get(LANG) || Langs.EN;
  }

  set(lang: string) {
    this.storage.set(LANG, lang);
  }
}
