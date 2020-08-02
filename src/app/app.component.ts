import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {storage} from 'angularx';
import * as csv from 'csvtojson';
import {DefaultCurrencyService, DefaultLocaleService} from 'locale-service';
import {resources} from 'model-formatter';
import * as moment from 'moment';
import {phonecodes} from 'phonecodes';
import {uialert} from 'ui-alert';
import {loading} from 'ui-loading';
import {DefaultUIService, formatter, resources as uiresources} from 'ui-plus';
import {toast} from 'ui-toast';
import {resources as vresources} from 'validation-util';
import {DefaultCsvService, resource} from 'web-clients';
import Resources from './shared/Resources';

class MomentDateService {
  parse(value: string, format: string): Date {
    if (!format || format.length === 0) {
      format = 'MM/DD/YYYY';
    } else {
      format = format.toUpperCase();
    }
    try {
      const d = moment(value, format).toDate();
      return d;
    } catch (err) {
      return null;
    }
  }
}

@Component({
  selector: 'app-root',
  template: '<div><router-outlet></router-outlet></div>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    const localeService = new DefaultLocaleService();
    const currencyService = new DefaultCurrencyService();
    resource.csv = new DefaultCsvService(csv);
    storage.authentication = 'signin';
    storage.home = 'articles';
    storage.setResources(Resources);
    storage.setCurrencyService(currencyService);
    storage.setLocaleService(localeService);
    storage.setAlertService(uialert);
    storage.setLoadingService(loading);
    storage.setToastService(toast);
    storage.setUIService(new DefaultUIService());
    const resourceService = storage.resource();
    const dateService = new MomentDateService();
    vresources.phonecodes = phonecodes;
    uiresources.dateService = dateService;
    uiresources.currencyService = currencyService;
    uiresources.localeService = localeService;
    uiresources.resourceService = resourceService;
    resources.formatPhone = formatter.formatPhone;
    resources.formatFax = formatter.formatFax;
    resources.getCurrency = currencyService.getCurrency;
    resources.formatNumber = localeService.formatNumber;
    if (location.href.startsWith(storage.getRedirectUrl())) {
      window.location.href = location.origin + '/connect/oauth2' + location.search;
    }

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
