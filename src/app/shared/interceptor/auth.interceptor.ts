import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { JwtStoreService } from 'src/app/auth/services/jwt-store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private readonly _jwtStore: JwtStoreService) {
    
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Token ${this._jwtStore.getJwt()}`
      }
    });
    return next.handle(request);
  }
}
