import { Component, OnInit } from '@angular/core';
import { LoginPayload } from '../../models/login-payload.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formData: LoginPayload = {
    email: "",
    password: ""
  }
  submitLoginButtonOptions: any;

  constructor(private _authService: AuthService) {
    this.submitLoginButtonOptions = {
      text: 'LogIn',
      onClick: () => this._authService.login(this.formData)
    }
  }

}
