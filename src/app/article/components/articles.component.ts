import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {alertError, buildFromUrl, initForm, navigate, showToast, storage} from 'angularx';
import {SearchComponent} from 'core-component';
import {SearchModel} from 'onecore';
import {Article} from '../model/Article';
import {ArticleServiceImpl} from '../service/impl/ArticleServiceImpl';

@Component({
  selector: 'app-article-list',
  templateUrl: '../views/articles.html',
  providers: [ArticleServiceImpl]
})

export class ArticlesComponent extends SearchComponent<Article, SearchModel> implements OnInit {
  constructor(protected viewContainerRef: ViewContainerRef, protected router: Router, articleService: ArticleServiceImpl) {
    super(articleService, storage.resource(), storage.ui(), storage.getLocale, showToast, alertError, storage.loading());
  }
  ngOnInit() {
    this.form = initForm(this.viewContainerRef, storage.ui().initMaterial);
    const s = this.mergeSearchModel(buildFromUrl());
    this.load(s, storage.autoSearch);
  }
  viewArticle(articleId: string) {
    navigate(this.router, 'articles', articleId);
  }
}
