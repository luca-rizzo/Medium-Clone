import { Component, OnInit } from '@angular/core';
import { RegistrationPayload } from '../../models/registration-payload.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  
  errorMessage$ = this._authService.authError$;

  formData: RegistrationPayload = {
    username: "",
    password: "",
    email: "",
  }
  submitRegButtonOptions: any;

  constructor(private readonly _authService: AuthService) {
    this.submitRegButtonOptions = {
      text: 'Register',
      onClick: () => this._authService.register(this.formData)
    }
  }

}
