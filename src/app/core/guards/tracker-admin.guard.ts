import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TrackerAdminGuard implements CanActivate {
  adminRole: string = 'Administrator';
  trackerId: string = 'fdda922d-84a8-48b6-b59c-7dd694929ee5';

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.auth.isLoggedIn() &&
      this.auth.isRole(this.adminRole) &&
      this.auth.inOrganization(this.trackerId)
    ) {
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  }
}
