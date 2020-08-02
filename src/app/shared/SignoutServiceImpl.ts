import {HttpClient} from '@angular/common/http';
import {storage} from 'angularx';
import config from '../../config';
import {SignoutService} from './SignoutService';

export class SignoutServiceImpl implements SignoutService {
  constructor(private http: HttpClient) {
  }

  async signout(username: string): Promise<boolean> {
    const url = config.authenticationServiceUrl + '/authentication/signout/' + username;
    const success = await this.http.get<boolean>(url).toPromise();
    if (success) {
      sessionStorage.setItem('authService', null);
      sessionStorage.clear();
      storage.setUser(null);
    }
    return success;
  }
}
