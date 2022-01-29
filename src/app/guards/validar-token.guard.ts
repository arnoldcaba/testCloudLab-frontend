import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor (private srvAuth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      console.log('canActivate');
      return this.srvAuth.validarToken()
        .pipe(
          tap(valid => {
            if (!valid) {
              this.router.navigate(['/auth']);
            }
          })
        )
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
      console.log('canLoad');
      return this.srvAuth.validarToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigate(['/auth']);
          }
        })
      )
  }
}
