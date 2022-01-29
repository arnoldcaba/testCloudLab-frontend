import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario, UsuariosResponse } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { 
    const token = localStorage.getItem('token');
  }

  getUsuarios(page: number = 1): Observable<UsuariosResponse> {
    const url = environment.baseUrl + 'usuarios' + '?page=' + page;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');
    const httpOptions: Object = { headers, responseType: 'json' }
    return this.http.get<UsuariosResponse>(url, httpOptions);
  }

  getUsuario(id: number): Observable<Usuario> {
    const url = environment.baseUrl + 'usuarios/' + id;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');
    const httpOptions: Object = { headers, responseType: 'json' }
    return this.http.get<Usuario>(url, httpOptions);
  }

  saveUsuario(usuario: Usuario): Observable<Usuario> {
    const url = environment.baseUrl + 'usuarios';
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');
    const httpOptions: Object = { headers, responseType: 'json' }
    return this.http.post<Usuario>(url, usuario, httpOptions);
  }

  deleteUsuario(id: number): Observable<any> {
    const url = environment.baseUrl + 'usuarios/' + id;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');
    const httpOptions: Object = { headers, responseType: 'json' }
    return this.http.delete<any>(url, httpOptions);
  }
}
