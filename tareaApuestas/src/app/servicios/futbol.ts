import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Importamos las interfaces necesarias
import { Match, Standing, User, Player } from '../modelos/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SoccerService {

  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene los partidos de la jornada actual.
   * Endpoint: GET /api/matches
   * Ideal para la pantalla principal (Dashboard).
   * @returns Observable con un array de partidos
   */
  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.API_URL}/matches`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene la tabla de clasificación de La Liga.
   * Endpoint: GET /api/league/standings
   * @returns Observable con un array de las posiciones de los equipos
   */
  getStandings(): Observable<Standing[]> {
    return this.http.get<Standing[]>(`${this.API_URL}/league/standings`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene el ranking global de usuarios (Tipsters).
   * Endpoint: GET /api/leaderboard
   * @returns Observable con un array de usuarios ordenados por puntos
   */
  getLeaderboard(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/leaderboard`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene la plantilla completa de jugadores de un equipo específico.
   * Endpoint: GET /api/teams/:name/players
   * @param teamName Nombre del equipo (ej. "Real Madrid")
   * @returns Observable con un array de jugadores
   */
  getTeamPlayers(teamName: string): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.API_URL}/teams/${teamName}/players`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Manejo centralizado de errores para el servicio de fútbol.
   */
  private handleError(error: any) {
    console.error('Error en SoccerService:', error);
    
    // Extraemos el mensaje del backend si existe, o ponemos uno genérico
    const mensaje = error.error?.message || 'Error al conectar con los datos de la liga.';
    return throwError(() => new Error(mensaje));
  }
}