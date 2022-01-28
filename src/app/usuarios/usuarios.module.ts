import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListUsuariosComponent } from './pages/list-usuarios/list-usuarios.component';
import { FormUsuariosComponent } from './pages/form-usuarios/form-usuarios.component';
import { PrimengModule } from '../primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListUsuariosComponent,
    FormUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    PrimengModule,
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }
