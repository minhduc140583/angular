import {Injectable} from '@angular/core';
import {DefaultHttpRequest} from 'angularx';
import {AuthenticationWebClient as BaseAuthenticationWebClient, AuthInfo, AuthResult} from 'authentication-component';
import config from '../../../../config';

@Injectable()
export class AuthenticationWebClient extends BaseAuthenticationWebClient {
  constructor(http: DefaultHttpRequest) {
    super(http, config.authenticationServiceUrl + '/authentication/authenticate');
  }

  authenticateByOAuth2(user: AuthInfo): Promise<AuthResult> {
    const url = config.authenticationServiceUrl + '/oauth2/authenticate';
    return this.http.post<AuthResult>(url, user);
  }
}
