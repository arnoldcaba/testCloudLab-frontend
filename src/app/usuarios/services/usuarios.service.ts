import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario, UsuariosResponse } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  get httpOptions(): Object {
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');
    return { headers, responseType: 'json' }
  }


  constructor(private http: HttpClient) { 
    const token = localStorage.getItem('token');
  }

  getUsuarios(page: number = 1): Observable<UsuariosResponse> {
    const url = environment.baseUrl + 'usuarios' + '?page=' + page;
    return this.http.get<UsuariosResponse>(url, this.httpOptions);
  }

  getUsuario(id: number): Observable<Usuario> {
    const url = environment.baseUrl + 'usuarios/' + id;
    return this.http.get<Usuario>(url, this.httpOptions);
  }

  saveUsuario(usuario: Usuario): Observable<Usuario> {
    const url = environment.baseUrl + 'usuarios';
    return this.http.post<Usuario>(url, usuario, this.httpOptions);
  }

  deleteUsuario(id: number): Observable<any> {
    const url = environment.baseUrl + 'usuarios/' + id;
    return this.http.delete<any>(url, this.httpOptions);
  }
}
