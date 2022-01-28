import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario, UsuariosResponse } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  getUsuarios(page: number = 1): Observable<UsuariosResponse> {
    return this.http.get<UsuariosResponse>(environment.baseUrl + 'usuarios' + '?page=' + page);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(environment.baseUrl + 'usuarios/' + id);
  }

  saveUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(environment.baseUrl + 'usuarios', usuario);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'usuarios/' + id);
  }
}
