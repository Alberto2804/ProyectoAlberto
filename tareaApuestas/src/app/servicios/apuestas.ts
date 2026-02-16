import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BetService {
  constructor(private http: HttpClient) {}
  enviarApuesta(apuesta: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/bets`, apuesta);
  }
}