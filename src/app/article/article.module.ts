import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ArticleRoutingModule} from './article-routing.module';
import {ArticlesModuleComponent} from './articles.module.component';
import {ArticleComponent} from './components/article.component';
import {ArticlesComponent} from './components/articles.component';
import {ContenteditableModelDirective} from './components/contenteditableModel.directive';
import {TextEditorComponent} from './components/text-editor.component';
import {ArticleServiceImpl} from './service/impl/ArticleServiceImpl';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ArticleRoutingModule,
    ReactiveFormsModule,
    BsDropdownModule,
    PaginationModule
  ],
  declarations: [
    ArticlesModuleComponent,
    ArticlesComponent,
    ArticleComponent,
    TextEditorComponent,
    ContenteditableModelDirective
  ],
  entryComponents: [

  ],
  providers: [
    ArticleServiceImpl
  ]
})

export class ArticleModule {
}
