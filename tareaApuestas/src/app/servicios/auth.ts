import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';


import { User, AuthResponse } from '../modelos/interfaces'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = environment.apiUrl;
  
  private authSubject = new BehaviorSubject<boolean>(false);
  
 
  private usuarioActual: User | null = null; 

  constructor(private http: HttpClient) {
    this.cargarSesion();
  }

  
  private async cargarSesion(): Promise<void> {
    const { value: token } = await Preferences.get({ key: 'token' });
    const { value: userJson } = await Preferences.get({ key: 'user' });

    if (token && userJson) {
      this.usuarioActual = JSON.parse(userJson) as User;
      this.authSubject.next(true);
    } else {
      this.authSubject.next(false);
    }
  }

 
  login(credenciales: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credenciales).pipe(
      tap(async (res) => {
        if (res.token && res.user) {
          await this.guardarDatosSesion(res.token, res.user);
        }
      }),
      catchError(this.handleError)
    );
  }

  
  register(datos: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, datos).pipe(
      tap(async (res) => {
        if (res.token && res.user) {
          await this.guardarDatosSesion(res.token, res.user);
        }
      }),
      catchError(this.handleError)
    );
  }

  
  private async guardarDatosSesion(token: string, user: User): Promise<void> {
    await Preferences.set({ key: 'token', value: token });
    await Preferences.set({ key: 'user', value: JSON.stringify(user) });
    
    this.usuarioActual = user;
    this.authSubject.next(true);
  }

 
  async logout(): Promise<void> {
    await Preferences.clear();
    this.usuarioActual = null;
    this.authSubject.next(false);
  }

  
  get isLoggedIn$(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

 
  get currentUser(): User | null {
    return this.usuarioActual;
  }


  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'token' });
    return value;
  }

  
  private handleError(error: any) {
    console.error('Error de Autenticación:', error);
    const mensaje = error.error?.message || 'Ha ocurrido un error inesperado. Inténtalo de nuevo.';
    return throwError(() => new Error(mensaje));
  }
}