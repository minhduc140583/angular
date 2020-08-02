import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {initForm, navigate, storage} from 'angularx';
import {AuthenticationService, AuthInfo, AuthResult, AuthStatus, getErrorMessage, getMessage, handleCookie, initFromCookie, store, validate} from 'authentication-component';
import {CookieService} from 'ngx-cookie-service';
import {AuthenticationWebClient} from '../service/impl/AuthenticationWebClient';

declare var Base64: any;

@Component({
  selector: 'app-signin',
  templateUrl: '../view/signin.html',
  providers: [AuthenticationWebClient, CookieService],
})
export class SigninComponent implements OnInit {
  constructor(protected viewContainerRef: ViewContainerRef, protected router: Router, protected cookieService: CookieService, authenticationService: AuthenticationWebClient) {
    this.resource = storage.getResource();
    this.authenticationService = authenticationService;
    this.showDanger = this.showDanger.bind(this);
    this.hideMessage = this.hideMessage.bind(this);
  }
  resource: any;
  message = '';
  alertClass = '';
  remember = true;
  authenticationService: AuthenticationService;
  user: AuthInfo = {
    username: '',
    passcode: '',
    password: ''
  };

  ngOnInit() {
    initForm(this.viewContainerRef.element.nativeElement, storage.ui().initMaterial);
    this.remember = initFromCookie('data', this.user, this.cookieService, Base64);
  }

  showDanger(msg: string, field?: string): void {
    this.alertClass = 'alert alert-danger';
    this.message = msg;
  }
  hideMessage(field?: string): void {
    this.alertClass = '';
    this.message = '';
  }

  forgotPassword() {
    navigate(this.router, 'forgot-password');
  }

  signup() {
    navigate(this.router, 'signup');
  }

  succeed(result: AuthResult) {
    store(result.user, storage, storage);
    navigate(this.router, storage.home);
  }
  async signin(event: any) {
    const r = storage.resource();
    this.user.username = this.user.username.trim();
    if (!validate(this.user, r, this.showDanger)) {
      return;
    } else {
      this.hideMessage();
    }
    try {
      storage.loading().showLoading();
      const result = await this.authenticationService.authenticate(this.user);
      const status = result.status;
      // tslint:disable-next-line:triple-equals
      if (status == AuthStatus.Success || status == AuthStatus.SuccessAndReactivated) {
        handleCookie('data', this.user, this.remember, this.cookieService, 60 * 24 * 3, Base64);
        const expiredDays = dayDiff(result.user.passwordExpiredTime, new Date()) ;
        if (expiredDays > 0) {
          const msg = r.format(r.value('msg_password_expired_soon'), expiredDays);
          storage.toast().showToast(msg);
        }
        // tslint:disable-next-line:triple-equals
        if (status == AuthStatus.Success) {
          this.succeed(result);
        } else {
          const message3 = r.value('msg_account_reactivated');
          storage.alert().alertInfo(message3, null, function() {
            this.succeed(result);
          });
        }
      } else if (status !== AuthStatus.TwoFactorRequired) {
        store(null, storage, storage);
        const msg = getMessage(status, r);
        this.showDanger(msg);
      }
    } catch (err) {
      this.handleError(err);
    } finally {
      storage.loading().hideLoading();
    }
  }

  handleError(err?: any) {
    const r = storage.resource();
    const msg = getErrorMessage(err, r);
    storage.alert().alertError(msg.message, msg.title);
  }
}

export function dayDiff(start: Date, end: Date): number {
  if (!start || !end) {
    return null;
  }
  return Math.floor(Math.abs((start.getTime() - end.getTime()) / 86400000));
}
