import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { AuthResponse, Usuario } from '../modelos/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  

  private usuarioLogueado = new BehaviorSubject<Usuario | null>(null);

  constructor(private http: HttpClient) {
    this.cargarSesionInicial();
  }

  private async cargarSesionInicial() {
    const tokenData = await Preferences.get({ key: 'auth-token' });
    const userData = await Preferences.get({ key: 'user-data' });
    
    if (tokenData.value && userData.value) {
      this.usuarioLogueado.next(JSON.parse(userData.value));
    }
  }

  get usuario$() {
    return this.usuarioLogueado.asObservable();
  }



  login(credenciales: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credenciales).pipe(
      switchMap(async (res) => {
        await this.guardarSesion(res.token, res.user);
        this.usuarioLogueado.next(res.user);
        return res;
      })
    );
  }

  
  registro(credenciales: { username: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, credenciales).pipe(
      switchMap(async (res) => {
        await this.guardarSesion(res.token, res.user);
        this.usuarioLogueado.next(res.user);
        return res;
      })
    );
  }

  
  private async guardarSesion(token: string, user: Usuario) {
    await Preferences.set({ key: 'auth-token', value: token });
    await Preferences.set({ key: 'user-data', value: JSON.stringify(user) });
  }

 
  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'auth-token' });
    return value;
  }

 
  async logout() {
    await Preferences.remove({ key: 'auth-token' });
    await Preferences.remove({ key: 'user-data' });
    this.usuarioLogueado.next(null);
  }
}