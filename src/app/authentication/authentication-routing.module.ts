import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationModuleComponent} from './authentication.module.component';
import {ChangePasswordComponent} from './component/change-password.component';
import {ForgotPasswordComponent} from './component/forgot-password.component';
import {ResetPasswordComponent} from './component/reset-password.component';
import {SigninComponent} from './component/signin.component';

const authenticationRoutes: Routes = [
  {
    path: '',
    component: AuthenticationModuleComponent,
    children: [
      {path: 'signin', component: SigninComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'reset-password', component: ResetPasswordComponent},
      {path: 'change-password', component: ChangePasswordComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authenticationRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AuthenticationRoutingModule {
}
