import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent implements OnInit {

  get title () {
    return this.router.url === '/usuarios/form' ? 'Crear Usuario' : 'Detalle Usuario';
  }

  loading: boolean = false;

  formUsuario: FormGroup = this.fb.group({
    _id: [''],
    usuario: ['', [Validators.required, Validators.minLength(3), Validators.pattern('(?!.*[\.\-\_]{2,})^[a-zA-Z0-9\.\-\_]{3,24}$')]],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],  
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private srvUsuarios: UsuariosService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    const id = parseInt(this.router.url.split('/')[3]);
    if (id) this.getUser(id);
  }

  clearForm() {
    this.formUsuario.reset();
  }

  getUser (id: number) {
    this.loading = true;
    this.srvUsuarios.getUsuario(id).subscribe({
      next: (usuario: Usuario) => {
        this.formUsuario.patchValue(usuario);
        this.formUsuario.disable();
        this.loading = false
      },
      error: err => {
        console.log(err)
        this.loading = false;
        this.toastr.error('Error al obtener usuario');
        this.router.navigate(['/usuarios/list']);
      },
      complete: () => console.log('complete')
    });
  }

  save() {
    this.ajustarForm();
    console.log(this.formUsuario.value);
    if (this.formUsuario.valid) {
      console.log('Formulario valido');
      this.loading = true;
      this.srvUsuarios.saveUsuario(this.formUsuario.value).subscribe({
        next: (usuario: Usuario) => {
          console.log(usuario);
          this.toastr.success('Usuario agregado correctamente');
          this.router.navigate(['/usuarios/list']);
          this.loading = false;
        },
        error: err => {
          console.log(err);
          if (err.error) {
            const { message, code } = err.error;
            if (code === 1) this.formUsuario.get('correo')!.setErrors({ 'inuse': true });
            if (code === 2) this.formUsuario.get('usuario')!.setErrors({ 'inuse': true });
            this.formUsuario.markAsTouched();
            this.toastr.error(message);
          } else {
            this.toastr.error('Error al agregar usuario');
          }
          this.loading = false;
        },
        complete: () => {
          console.log('complete');}
      });
    } else {
      this.formUsuario.markAllAsTouched();
      this.toastr.error('Errores en el formulario', 'Error');
    }
  }

  campoValido(campo: string) {
    return this.formUsuario.controls[campo].errors && (this.formUsuario.controls[campo].dirty || this.formUsuario.controls[campo].touched);
  }
  getErrorMsg (campo: string) {
    const errors = this.formUsuario.get(campo)?.errors
    if (errors) {
      const { required, minlength, email, inuse, pattern } = errors;
      if (required) return 'Campo requerido';
      if (minlength) return 'Minimo 3 caracteres';
      if (email) return 'Email incorrecto';
      if (inuse) return 'Ya se encuentra registrado';
      if (pattern) return 'No cumple con el patron de usuario';
    }
    return '';
  }

  deleteUser () {
    const conf = confirm('¿Esta seguro de eliminar el usuario?');
    if (conf) {
      const id = this.formUsuario.get('_id')!.value;
      this.loading = true;
      this.srvUsuarios.deleteUsuario(id).subscribe({
        next: () => {
          this.toastr.success('Usuario eliminado correctamente');
          this.router.navigate(['/usuarios/list']);
          this.loading = false;
        },
        error: err => {
          console.log(err);
          this.toastr.error('Error al eliminar usuario');
          this.loading = false;
        },
        complete: () => console.log('complete')
      });
    }
  }

  ajustarForm() {
    this.formUsuario.patchValue({
      usuario: this.normalize(this.formUsuario.get('usuario')!.value),
      nombre: this.normalize(this.formUsuario.get('nombre')!.value),
      apellido: this.normalize(this.formUsuario.get('apellido')!.value),
      correo: this.normalize(this.formUsuario.get('correo')!.value)
    });
  }

  normalize (value: string) {
    return value.trim()?.toUpperCase();
  }


  goback() {
    this.router.navigate(['/usuarios/list']);
  }

}
