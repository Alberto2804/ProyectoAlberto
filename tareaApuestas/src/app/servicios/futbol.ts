import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SoccerService {
  private urlApi = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getMatches(): Observable<any[]> { return this.http.get<any[]>(`${this.urlApi}/matches`); }
  getStandings(): Observable<any[]> { return this.http.get<any[]>(`${this.urlApi}/league/standings`); }
  getLeaderboard(): Observable<any[]> { return this.http.get<any[]>(`${this.urlApi}/leaderboard`); }
  getTeamPlayers(teamName: string): Observable<any[]> { return this.http.get<any[]>(`${this.urlApi}/teams/${teamName}/players`); }
}