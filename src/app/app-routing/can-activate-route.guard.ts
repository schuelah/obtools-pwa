import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActivateRouteGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return new Observable<boolean | UrlTree>(subscriber => {
      this.auth.isUserAuthenticated().subscribe(isAuthenticated => {
        if (isAuthenticated) {
          subscriber.next(true);
        } else {
          subscriber.next(this.router.createUrlTree(['/calc/cdh-calc']));
        }
      });
    });
  }
}
