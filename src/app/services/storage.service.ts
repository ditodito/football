import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  get<T>(key: string): T | undefined {
    const item = localStorage.getItem(key);

    if (!item) {
      return;
    }

    return JSON.parse(item);
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
