import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers
        .set('x-rapidapi-host', 'v3.football.api-sports.io')
        .set('x-rapidapi-key', '51eb1c719ed213bb4446b43b0cae6c0a'),
    });

    return next.handle(authReq);
  }
}
