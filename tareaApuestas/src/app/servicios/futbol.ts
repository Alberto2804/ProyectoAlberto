import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Partido, Clasificacion, Equipo, Jugador,Usuario } from '../modelos/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FutbolService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

 
  getPartidos(): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${this.apiUrl}/matches`);
  }


  getClasificacion(): Observable<Clasificacion[]> {
    return this.http.get<Clasificacion[]>(`${this.apiUrl}/league/standings`);
  }

 
  getJugadores(nombreEquipo: string): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(`${this.apiUrl}/teams/${nombreEquipo}/players`);
  }

  getRanking(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/leaderboard`);
  }
}