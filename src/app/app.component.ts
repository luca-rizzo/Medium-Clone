import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { JwtStoreService } from './auth/services/jwt-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private readonly _jwtStore: JwtStoreService, private readonly _router: Router){}

  ngOnInit(){
    if(this._jwtStore.isTokenExpired()){
      this._router.navigate(['login']);
    } else {
      this._router.navigate(['articles']);
    }
  }
}
