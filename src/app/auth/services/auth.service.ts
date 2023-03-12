import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map } from 'rxjs';
import { User } from 'src/app/user/model/user.model';
import { LoginPayload } from '../models/login-payload.model';
import { RegistrationPayload } from '../models/registration-payload.model';
import { AuthServiceWs } from './auth.service-ws';
import { JwtStoreService } from './jwt-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  authErrorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  authError$ = this.authErrorSubject.asObservable();

  constructor(private readonly _jwtStore: JwtStoreService, private readonly _authServiceWs: AuthServiceWs,
    private router: Router) { 
      if(!this._jwtStore.isTokenExpired()){
        this.retriveAndSetLoggedUser();
      }
    }

  register(registrationPayload: RegistrationPayload) {
    this._authServiceWs.register(registrationPayload).subscribe({
      next: userData => {
        this.setAuth(userData.user);
        this.router.navigate(["/articles"]);
      },
      error: errorResponse => {
        this.purgeAuth(errorResponse.error)
      }
    });
  }

  login(loginPayload: LoginPayload) {
    this._authServiceWs.login(loginPayload).subscribe({
      next: userData => {
        this.setAuth(userData.user);
        this.router.navigate(["/articles"]);
      },
      error: errorResponse => {
        this.purgeAuth(errorResponse.error)
      }
    });
  }

  retriveAndSetLoggedUser() {
    this._authServiceWs.getLoggedUser().subscribe({
      next: userData => {
        this.setAuth(userData.user);
        this.router.navigate(["/articles"]);
      },
      error: errorResponse => {
        this.purgeAuth(errorResponse.error)
      }
    });
  }

  setAuth(user: User) {
    this.currentUserSubject.next(user);
    this._jwtStore.setJwtToken(user.token);
    this.authErrorSubject.next('');
  }

  purgeAuth(errors: any) {
    this.authErrorSubject.next(this.handleError(errors));
    this._jwtStore.removeJwtToken();
    this.currentUserSubject.next(null);
  }

  handleError(errors: any) {
    let errorString = '';
    for (var prop in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, prop)) {
        errorString = errorString.concat(prop + " error: ")
        for (let error of errors[prop]) {
          errorString = errorString.concat("\t" + error + "\n");
        }
      }
    }
    return errorString;
  }

}
