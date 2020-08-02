import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {initForm, navigate} from 'angularx';
import {storage} from 'angularx';
import {BaseChangePasswordComponent} from 'password-component';
import {PasswordWebClient} from '../service/impl/PasswordWebClient';

@Component({
  selector: 'app-change-password',
  templateUrl: '../view/change-password.html',
})
export class ChangePasswordComponent extends BaseChangePasswordComponent implements OnInit {
  constructor(protected viewContainerRef: ViewContainerRef, protected router: Router, passwordService: PasswordWebClient) {
    super(passwordService, storage.resource(), storage.loading());
  }

  ngOnInit() {
    initForm(this.viewContainerRef.element.nativeElement, storage.ui().initMaterial);
  }

  signin() {
    navigate(this.router, 'signin');
  }
}
