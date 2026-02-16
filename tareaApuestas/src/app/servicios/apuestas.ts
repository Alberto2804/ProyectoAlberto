import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Apuesta } from '../modelos/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApuestasService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  realizarApuesta(apuesta: Partial<Apuesta>): Observable<any> {
    return this.http.post(`${this.apiUrl}/bets`, apuesta);
  }


  getMisApuestas(): Observable<Apuesta[]> {
    return this.http.get<Apuesta[]>(`${this.apiUrl}/bets/my-bets`); 
  }
}