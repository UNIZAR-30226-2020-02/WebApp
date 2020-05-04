import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthenticationService } from './authentication/authentication.service';

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, public auth: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}