import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuardServiceService implements CanActivate {
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    if (this.auth.token !== '') {
      return true;
    } else {
      // magic: moves the player to the home screen, because he is not logged in
      return this.router.parseUrl('/home'); 
    }
  }

  constructor(private auth: AuthenticationService ,private router: Router) { }
}
