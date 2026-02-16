import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Importamos la interfaz Bet que creaste
import { Bet } from '../modelos/interfaces'; 

@Injectable({
  providedIn: 'root'
})
export class BetService {

  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Envía una nueva apuesta al servidor.
   * Endpoint: POST /api/bets
   * * @param matchId ID del partido al que se apuesta
   * @param homeScore Goles predichos para el equipo local
   * @param awayScore Goles predichos para el equipo visitante
   * @returns Observable con la apuesta creada
   */
  realizarApuesta(matchId: number, homeScore: number, awayScore: number): Observable<Bet> {
    
    // Construimos el payload (el cuerpo de la petición)
    const payload = {
      matchId,
      homeScore,
      awayScore
    };

    return this.http.post<Bet>(`${this.API_URL}/bets`, payload).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Recupera el historial de apuestas del usuario actual.
   * Ideal para la funcionalidad opcional "Historial de Apuestas".
   * Asumimos que el backend tiene un GET /api/bets (verifica tu Swagger).
   * * @returns Observable con un array de apuestas
   */
  obtenerMisApuestas(): Observable<Bet[]> {
    return this.http.get<Bet[]>(`${this.API_URL}/bets`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Manejo centralizado de errores específicos de las apuestas.
   */
  private handleError(error: any) {
    console.error('Error en BetService:', error);
    
    // Personalizamos el mensaje según el error del backend (ej. "El partido ya ha empezado")
    const mensaje = error.error?.message || 'No se pudo procesar la apuesta. Revisa tu conexión.';
    return throwError(() => new Error(mensaje));
  }
}