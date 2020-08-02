import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {buildId, initForm, showToast, storage} from 'angularx';
import {EditComponent} from 'core-component';
import {UserServiceImpl} from '../../access/service/impl/UserServiceImpl';
import {Article} from '../model/Article';
import {ArticleServiceImpl} from '../service/impl/ArticleServiceImpl';

@Component({
  selector: 'app-article-editor',
  templateUrl: '../views/article.html',
  providers: [UserServiceImpl]
})
export class ArticleComponent extends EditComponent<Article, string> implements OnInit {
  constructor(protected viewContainerRef: ViewContainerRef, protected router: Router, protected route: ActivatedRoute, articleService: ArticleServiceImpl) {
    super(articleService, storage.resource(), storage.getLocale, showToast, storage.ui(), storage.alert(), storage.loading());
  }
  public article: any = {};

  ngOnInit() {
    this.form = initForm(this.viewContainerRef, storage.ui().initMaterial);
    const id: string = buildId(this.service.keys(), this.route);
    this.load(id);
  }

  public editorChange(textEditor: string) {
    this.article.body = textEditor;
  }
}

