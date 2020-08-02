import {OverlayModule} from '@angular/cdk/overlay';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {AuthenticationService, AuthorizationService} from 'angularx';
import {DefaultHttpRequest} from 'angularx';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ModalModule} from 'ngx-bootstrap/modal';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {CookieService} from 'ngx-cookie-service';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpLoaderFactory} from './app.translate.factory';
import {CoreModule} from './core/core.module';
import {DefaultLayoutComponent} from './shared/default-layout.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OverlayModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    CoreModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DefaultLayoutComponent
  ],
  providers: [
    AuthenticationService,
    AuthorizationService,
    DefaultHttpRequest,
    CookieService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
