import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  constructor(private authService: AuthService,
    private route: Router) { }

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return this.checkLoggedIn(state.url);
  };

  checkLoggedIn(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    else{
      this.authService.redirectUrl = url;
      this.route.navigate(['landing/login']);
      return false;
    }
  }

}
