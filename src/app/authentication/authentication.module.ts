import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {AuthenticationModuleComponent} from './authentication.module.component';
import {ChangePasswordComponent} from './component/change-password.component';
import {ConnectOAuth2Component} from './component/connect-oauth2.component';
import {ConnectComponent} from './component/connect.component';
import {ForgotPasswordComponent} from './component/forgot-password.component';
import {ResetPasswordComponent} from './component/reset-password.component';
import {SigninComponent} from './component/signin.component';
import {SignupComponent} from './component/signup.component';
import {WelcomeComponent} from './component/welcome.component';
import {AuthenticationWebClient} from './service/impl/AuthenticationWebClient';
import {IntegrationConfigurationServiceImpl} from './service/impl/IntegrationConfigurationServiceImpl';
import {PasswordWebClient} from './service/impl/PasswordWebClient';
import {SignupServiceImpl} from './service/impl/SignupServiceImpl';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthenticationModuleComponent,
    WelcomeComponent,
    ConnectComponent,
    ConnectOAuth2Component,
    SignupComponent,
    SigninComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent
  ],
  entryComponents: [],
  providers: [
    SignupServiceImpl, AuthenticationWebClient, PasswordWebClient, IntegrationConfigurationServiceImpl
  ]
})

export class AuthenticationModule {
}
