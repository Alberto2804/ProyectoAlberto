import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const TOKEN_KEY = 'jwt-token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private urlApi = environment.urlApi;
  private authState = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { this.checkToken(); }

  async checkToken() {
    const { value } = await Preferences.get({ key: TOKEN_KEY });
    this.authState.next(!!value);
  }

  isAuthenticated(): Observable<boolean> { return this.authState.asObservable(); }

  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: TOKEN_KEY });
    return value;
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.urlApi}/login`, credentials).pipe(
      tap(async (res: any) => {
        if (res && res.token) {
          await Preferences.set({ key: TOKEN_KEY, value: res.token });
          this.authState.next(true);
        }
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.urlApi}/register`, user);
  }

  obtenerPerfil(): Observable<any> {
    return this.http.get(`${this.urlApi}/profile`);
  }

  async logout() {
    await Preferences.remove({ key: TOKEN_KEY });
    this.authState.next(false);
  }
}