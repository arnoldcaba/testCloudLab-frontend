import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router, private srvAuth: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login () {
    this.srvAuth.login().subscribe({
      next: () => this.router.navigate(['usuarios']),
      error: () => {
        this.toastr.error('Error en autenticación');
      }
    });
    
  }

}
