import {GenericSearchService, ResultInfo, SearchModel} from 'onecore';
import {Article} from '../model/Article';

export interface ArticleService extends GenericSearchService<Article, string, ResultInfo<Article>, SearchModel> {

}
