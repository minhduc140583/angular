import {Injectable} from '@angular/core';
import {DefaultHttpRequest} from 'angularx';
import {PasswordWebClient as BasePasswordWebClient} from 'password-component';
import config from '../../../../config';

@Injectable()
export class PasswordWebClient extends BasePasswordWebClient {
  constructor(http: DefaultHttpRequest) {
    super(http, config.passwordServiceUrl + '/' + 'password');
  }
}
