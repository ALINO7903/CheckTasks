import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(private api: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(!!localStorage.getItem("token")) {
      return true;
    } else {
      // return this.router.parseUrl("/login");

      this.router.navigateByUrl("/login");
      return false;
    }
  }

  /*
    import { Observable, of } from 'rxjs';
    import { catchError, map } from 'rxjs/operators';
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.api.checkToken()
          .pipe(
            map(response => { // Trasforma l'Observable da tipo LoginResponse in boolean | UrlTree
              if(response.esito) {
                return true;
              } else {
                return this.router.parseUrl("/login");
              }
            }),
            catchError(error => of(this.router.parseUrl("/login")))
            // Nel caso di errore, devo restituire un nuovo Observable che mi fa la redirect verso la LoginComponent
          )
    }

  */

}
