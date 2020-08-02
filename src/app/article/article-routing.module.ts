import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticlesModuleComponent} from './articles.module.component';
import {ArticleComponent} from './components/article.component';
import {ArticlesComponent} from './components/articles.component';
import {TextEditorComponent} from './components/text-editor.component';

const articleRoutes: Routes = [
  {
    path: '',
    component: ArticlesModuleComponent,
    children: [
      {path: '', component: ArticlesComponent},
      {path: ':id', component: ArticleComponent},
      {path: 'details/new', component:  ArticleComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(articleRoutes),
  ],
  exports: [
    RouterModule
  ]
})

export class ArticleRoutingModule {
}
