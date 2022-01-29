import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface AuthResponse {
  token: string,
  ok: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get token() {
    const token = localStorage.getItem('token');
    return token ? token : null;
  }

  constructor(private http: HttpClient) { }

  login() {
    return this.http.post(environment.baseUrl + 'auth/login', {})
      .pipe(
        tap((auth: any) => localStorage.setItem('token', auth.token))
      )
  }

  validarToken(): Observable<boolean> {
    const url = environment.baseUrl + 'auth/validate'
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');
    const httpOptions: Object = { headers, responseType: 'json' }
    return this.http.get<AuthResponse>(url, httpOptions)
    .pipe(
      map(resp => {
        return (resp.ok) 
      }),
      catchError(error => {
        return of(false)
      })
    )
  }
}
