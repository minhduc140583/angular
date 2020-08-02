import {Injectable} from '@angular/core';
import {DefaultHttpRequest} from 'angularx';
import config from '../../../../config';
import {SignupInfo} from '../../model/SignupInfo';
import {SignupResult} from '../../model/SignupResult';
import {SignupService} from '../SignupService';

@Injectable()
export class SignupServiceImpl implements SignupService {
  constructor(private http: DefaultHttpRequest) {
  }

  signup(signupInfo: SignupInfo): Promise<SignupResult> {
    const url = config.userRegistrationServiceUrl + '/signup/signup';
    return this.http.post<SignupResult>(url, signupInfo);
  }
}
