import {Injectable} from '@angular/core';
import {DefaultHttpRequest} from 'angularx';
import {ResultInfo, SearchModel} from 'onecore';
import {GenericSearchWebClient} from 'web-clients';
import config from '../../../../config';
import {articleModel} from '../../metadata/ArticleModel';
import {Article} from '../../model/Article';
import {ArticleService} from '../ArticleService';

@Injectable()
export class ArticleServiceImpl extends GenericSearchWebClient<Article, string, ResultInfo<Article>, SearchModel> implements ArticleService {
  constructor(http: DefaultHttpRequest) {
    super(config.articleServiceUrl, http, articleModel);
  }
}
