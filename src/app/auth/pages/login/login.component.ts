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

  loading: boolean = false;

  constructor( private router: Router, private srvAuth: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login () {
    this.loading = true;
    this.srvAuth.login().subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['usuarios']);
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Error en autenticación');
      }
    });
    
  }

}
