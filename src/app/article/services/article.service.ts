import { Injectable } from '@angular/core';
import { LoadOptions } from 'devextreme/data';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { lastValueFrom, map, Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { ArticleServiceWs } from './article.service-ws';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles$: Observable<{articles: Article[], articleCount: number}> = this._articleServiceWs.getArticles();
  
  
  
  private readonly _customStore = new CustomStore<Article>({
    key: 'slug',
    load: (loadOptions: LoadOptions) => {
      return lastValueFrom(this._articleServiceWs.getArticles(loadOptions.skip, 10).pipe(map(response => response.articles)));
    },
    totalCount: () => {
      return lastValueFrom(this._articleServiceWs.getArticles().pipe(map(response => response.articleCount)))
    }
  })

  articleDataSource: DataSource = new DataSource<Article>({
    store: this._customStore,
    paginate: true,
    pageSize: 10
  })

  constructor(private readonly _articleServiceWs: ArticleServiceWs) {}

  
}
