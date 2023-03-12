import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './components/registration/registration.component';
import { DxFormModule } from 'devextreme-angular';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { LoginComponent } from './components/login/login.component';
import { UserModule } from '../user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { NoAuthGuard } from '../shared/guard/no-auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';

const routes: Routes = [
  { path: "registration", component: RegistrationPageComponent, canActivate: [NoAuthGuard] },
  { path: "login", component: LoginPageComponent, canActivate: [NoAuthGuard] }
]

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    DxFormModule,
    UserModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RegistrationComponent
  ]
})
export class AuthModule { }
