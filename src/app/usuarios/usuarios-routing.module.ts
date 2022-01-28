import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormUsuariosComponent } from './pages/form-usuarios/form-usuarios.component';
import { ListUsuariosComponent } from './pages/list-usuarios/list-usuarios.component';

const routes: Routes = [
  { 
    path: '',
    children: [
      { path: 'lista', component: ListUsuariosComponent },
      { path: 'form', component: FormUsuariosComponent },
      { path: 'form/:id', component: FormUsuariosComponent },
      { path: '**', redirectTo: 'lista' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
