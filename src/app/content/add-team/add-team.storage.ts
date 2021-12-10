import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services';

const LAST_SEARCHES = 'lastSearches';

@Injectable()
export class AddTeamStorage {
  lastSearches: string[] = [];

  constructor(private storage: StorageService) {}

  addToLastSearches(key: string): void {
    if (this.lastSearches.length < 3) {
      this.lastSearches = [key, ...this.lastSearches];
      //this.lastSearches.push(key);
    } else {
      this.lastSearches = [key, ...this.lastSearches.slice(0, 2)];
    }

    this.storage.set<string[]>(LAST_SEARCHES, this.lastSearches);
  }

  restoreState(): void {
    const storageSearches = this.storage.get<string[]>(LAST_SEARCHES);

    if (storageSearches && storageSearches.length > 0) {
      this.lastSearches = storageSearches;
    }
  }
}
