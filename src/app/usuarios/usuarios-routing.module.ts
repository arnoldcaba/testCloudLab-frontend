import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from '../guards/validar-token.guard';
import { FormUsuariosComponent } from './pages/form-usuarios/form-usuarios.component';
import { ListUsuariosComponent } from './pages/list-usuarios/list-usuarios.component';

const routes: Routes = [
  { 
    path: '',
    children: [
      { path: 'lista', component: ListUsuariosComponent, canActivate: [ValidarTokenGuard], canLoad: [ValidarTokenGuard] },
      { path: 'form', component: FormUsuariosComponent, canActivate: [ValidarTokenGuard], canLoad: [ValidarTokenGuard] },
      { path: 'form/:id', component: FormUsuariosComponent, canActivate: [ValidarTokenGuard], canLoad: [ValidarTokenGuard] },
      { path: '**', redirectTo: 'lista' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
