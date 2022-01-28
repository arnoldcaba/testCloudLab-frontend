import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, UsuariosResponse } from '../../interfaces/usuario.interface';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.css']
})
export class ListUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private srvUsuarios: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.getUsuarios(1);
  }
  
  getUsuarios(page: number) {
    this.srvUsuarios.getUsuarios(page).subscribe({
      next: (usuarios: UsuariosResponse) => {
        this.usuarios = usuarios.usuarios
      },
      error: err => console.log(err),
      complete: () => console.log('complete')
    });
  }

  gotoForm () {
    this.router.navigate(['/usuarios/form']);
  }

  gotoDetail (usuario: Usuario) {
    this.router.navigate(['/usuarios/form/' + usuario._id]);
  }

}
