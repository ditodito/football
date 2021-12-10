import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _loading: Subject<boolean> = new Subject<boolean>();

  get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  constructor() { }

  start(): void {
    this._loading.next(true);
  }

  end(): void {
    this._loading.next(false);
  }

}
