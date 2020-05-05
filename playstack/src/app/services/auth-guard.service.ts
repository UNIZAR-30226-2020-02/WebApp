import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthenticationService } from './authentication/authentication.service';

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, public auth: AuthenticationService) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    /*
    let user = await this.auth.getUserName();
    console.log(user);
    */
    return true;
  }
}