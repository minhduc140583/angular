import {Injectable} from '@angular/core';
import {DefaultHttpRequest} from 'angularx';
import config from '../../../../config';
import {IntegrationConfiguration} from '../../model/IntegrationConfiguration';
import {IntegrationConfigurationService} from '../IntegrationConfigurationService';

@Injectable()
export class IntegrationConfigurationServiceImpl implements IntegrationConfigurationService {
  constructor(private http: DefaultHttpRequest) {

  }

  private serviceUrl = config.authenticationServiceUrl + '/' + 'integrationConfigurations';

  all(): Promise<IntegrationConfiguration[]> {
    const url = this.serviceUrl;
    const objectObservable: any = this.http.get(url);
    return objectObservable;
  }

  getByType(type: string): Promise<IntegrationConfiguration> {
    throw new Error('Method not implemented.'); // TODO
  }
}
