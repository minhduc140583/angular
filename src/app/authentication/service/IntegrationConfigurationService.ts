import {IntegrationConfiguration} from '../model/IntegrationConfiguration';

export interface IntegrationConfigurationService {
  all(): Promise<IntegrationConfiguration[]>;
  getByType(type: string): Promise<IntegrationConfiguration>;
}
