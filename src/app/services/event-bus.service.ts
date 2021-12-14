import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';

export interface EventBusEvent {
  key: string;
  data?: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private eventBus$: Subject<EventBusEvent>;

  constructor() {
    this.eventBus$ = new Subject<EventBusEvent>();
  }

  emit(key: string, data?: unknown) {
    this.eventBus$.next({ key, data });
  }

  on<T>(key: string): Observable<T> {
    return this.eventBus$.asObservable().pipe(
      filter((event) => event.key === key),
      map((event) => event.data as T)
    );
  }
}
