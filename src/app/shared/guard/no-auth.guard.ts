import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { JwtStoreService } from 'src/app/auth/services/jwt-store.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private readonly _jwtStore: JwtStoreService, private readonly _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._jwtStore.isTokenExpired()) {
      this._router.navigate(['articles']);
      return false;
    }
    return true;
  }

}
