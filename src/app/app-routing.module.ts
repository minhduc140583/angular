import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationService, AuthorizationService} from 'angularx';
import {Error404Component} from './core/error404/error-404.component';
import {DefaultLayoutComponent} from './shared/default-layout.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthenticationService],
    children: [
      {
        path: 'articles',
        canActivate: [AuthorizationService],
        loadChildren: './article/article.module#ArticleModule'
      }
    ]
  },
  // {path: '', component: TemplatesComponent},
  // {path: 'users', loadChildren: './user/UsersModule#UsersModule'},
  {path: '', loadChildren: './authentication/authentication.module#AuthenticationModule'},
  {path: '404', component: Error404Component},

  // otherwise redirect to 404
  {path: '**', redirectTo: '/' + '404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
