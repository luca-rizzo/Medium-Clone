import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user/model/user.model';
import { environment } from 'src/environments/environment';
import { LOGIN_ENDPOINT, REGISTRATION_ENDPOINT, USER_ENDPOINT } from '../endpoint/endpoint';
import { LoginPayload } from '../models/login-payload.model';
import { RegistrationPayload } from '../models/registration-payload.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceWs {

  constructor(private readonly _httpClient: HttpClient) {

  }

  register(registrationPayload: RegistrationPayload): Observable<{user: User}>{
    const url = environment.api_url.concat(REGISTRATION_ENDPOINT);
    return this._httpClient.post<{user: User}>(url, {user : registrationPayload});
  }

  login(loginPayload: LoginPayload): Observable<{user: User}>{
    const url = environment.api_url.concat(LOGIN_ENDPOINT);
    return this._httpClient.post<{user: User}>(url, {user : loginPayload});
  }

  getLoggedUser(): Observable<{user: User}>{
    const url = environment.api_url.concat(USER_ENDPOINT);
    return this._httpClient.get<{user: User}>(url);
  }
}
