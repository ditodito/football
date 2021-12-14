import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeamApi } from '../models';

@Injectable()
export class TeamApiService {
  constructor(private http: HttpClient) {}

  getTeamByName(team: string): Observable<TeamApi> {
    return this.http.get<TeamApi>(`${environment.footballAPI}/teams?name=${team}`);
  }

  getTeamById(teamId: number): Observable<TeamApi> {
    return this.http.get<TeamApi>(`${environment.footballAPI}/teams?id=${teamId}`);
  }
}
