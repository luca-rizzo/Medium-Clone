import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtStoreService {
  private readonly JWT_ID = 'jwtMediumCloneToken';

  private readonly _jwtTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  jwtToken$ = this._jwtTokenSubject.asObservable();
  constructor() { 
    const jwt = window.localStorage[this.JWT_ID];
    if (jwt && !this.tokenExpired(jwt)) {
      this.setJwtToken(jwt);
    }
  }

  setJwtToken(jwt: string) {
    this._jwtTokenSubject.next(jwt);
    window.localStorage[this.JWT_ID] = jwt;
  }

  removeJwtToken() {
    this._jwtTokenSubject.next('');
    window.localStorage.removeItem(this.JWT_ID);
  }

  getJwt(): string {
    return this._jwtTokenSubject.value;
  }

  isTokenExpired(): boolean{
    const currentJwt = this.getJwt();
    return currentJwt === '' || this.tokenExpired(currentJwt);
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
