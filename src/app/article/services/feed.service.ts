import { Injectable } from '@angular/core';
import { LoadOptions } from 'devextreme/data';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { lastValueFrom, map } from 'rxjs';
import { Article } from '../models/article.model';
import { FeedServiceWs } from './feed.service-ws';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private readonly _feedCustomStore = new CustomStore<Article>({
    key: 'slug',
    load: (loadOptions: LoadOptions) => {
      return lastValueFrom(this._feedServiceWs.getArticles(loadOptions.skip, 10).pipe(map(response => response.articles)));
    },
    totalCount: () => {
      return lastValueFrom(this._feedServiceWs.getArticles().pipe(map(response => response.articleCount)))
    }
  });

  feedDataSource: DataSource = new DataSource<Article>({
    store: this._feedCustomStore,
    paginate: true,
    pageSize: 10
  })

  constructor(private readonly _feedServiceWs: FeedServiceWs) {}
}
