import { Injectable } from '@angular/core';
import { DxListComponent } from 'devextreme-angular';
import { LoadOptions } from 'devextreme/data';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { BehaviorSubject, catchError, filter, lastValueFrom, map, merge, of, scan, shareReplay, Subject, switchMap, tap } from 'rxjs';
import { Profile } from 'src/app/profile/models/profile.model';
import { FollowerService } from 'src/app/profile/services/follower.service';
import { Article } from '../models/article.model';
import { ArticleServiceWs } from './article.service-ws';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private readonly _isLoadingSubject = new BehaviorSubject<boolean>(true);
  isLoadingAction$ = this._isLoadingSubject.asObservable();

  private readonly _openArticleSlugSubject = new BehaviorSubject<string>('');
  private readonly openArticleSlug$ = this._openArticleSlugSubject.asObservable();

  private readonly _followSubject = new Subject<Profile>();
  private readonly followAction$ = this._followSubject.asObservable();

  currentFullArticle$ = this.openArticleSlug$.pipe(
    tap(() => this._isLoadingSubject.next(true)),
    switchMap(slug => this._articleServiceWs.getArticle(slug).pipe(
      map(resp => resp.article),
      catchError(() => of({} as Article)))),
    switchMap(article => this._articleServiceWs.getCommentsOfArticle(article.slug).pipe(
      map(resp => resp.comments),
      map(comments => {
        article.comments = comments;
        Object.setPrototypeOf(article, Article.prototype);
        return article;
      }),
      catchError(() => of(article))
    )),
    tap(() => this._isLoadingSubject.next(false)),
  );

  currentFullArticleWithAction$ = merge(
    this.currentFullArticle$,
    this.followAction$.pipe(
      tap(profile => profile.following = !profile.following),
      switchMap(profile => this._followerService.followButtonClicked({ ...profile, following: !profile.following }).
        pipe(
          map(resp => resp.profile),
          catchError(() => of({ ...profile, following: !profile.following }))))
    )).pipe(
      scan((acc, value) => (value instanceof Article) ? value : { ...acc, author: value }, {} as Article),
    );


  private _articleList: DxListComponent = {} as DxListComponent;

  private readonly _articleCustomStore = new CustomStore<Article, string>({
    key: 'slug',
    load: (loadOptions: LoadOptions) => {
      return lastValueFrom(this._articleServiceWs.getArticles(loadOptions.skip, 10).pipe(map(response => response.articles)));
    },
    totalCount: () => {
      return lastValueFrom(this._articleServiceWs.getArticles().pipe(map(response => response.articleCount)));
    }
  });

  private _articleDataSource: DataSource = new DataSource<Article, string>({
    store: this._articleCustomStore,
    paginate: true,
    pageSize: 10
  });

  private _editLikeSubject = new BehaviorSubject<Article>({} as Article);
  editLike$ = this._editLikeSubject.asObservable();

  dataSource$ = of(this._articleDataSource);

  dataSourceWithEditLike$ = merge(
    this.dataSource$,
    this.editLike$.pipe(
      filter(article => Boolean(article.slug)),
      tap(article => this.temporaryHandleLike(article)),
      switchMap(article => this.handleLike(article))
    )
  ).pipe(
    map(value =>
      (value instanceof DataSource) ? value : this.refreshArticleAndDxList(value, this._articleDataSource)
    ),
  );

  constructor(private readonly _articleServiceWs: ArticleServiceWs, private readonly _followerService: FollowerService) { }

  handleLike(article: Article) {
    if (article.favorited) {
      return this._articleServiceWs.removeLike(article.slug).pipe(
        map(response => response.article),
        catchError(() => of(article))
      );
    }
    return this._articleServiceWs.addLike(article.slug).pipe(
      map(response => response.article),
      catchError(() => of(article))
    );
  }

  private temporaryHandleLike(article: Article) {
    let tempArticle: Article;
    if (article.favorited) {
      tempArticle = { ...article, favorited: false, favoritesCount: article.favoritesCount - 1 };
    } else {
      tempArticle = { ...article, favorited: true, favoritesCount: article.favoritesCount + 1 };
    }
    this.refreshArticleAndDxList(tempArticle, this._articleDataSource);
  }

  set articleList(articleList: DxListComponent) {
    this._articleList = articleList;
  }

  private refreshArticleAndDxList(article: Article, dataSource: DataSource) {
    const scrollTop = this._articleList.instance.scrollTop();
    dataSource.on('changed', () => this._articleList.instance.scrollTo(scrollTop));
    dataSource.store().push([{ type: "update", data: article, key: article.slug }]);
    return dataSource;
  }

  editLike(article: Article) {
    this._editLikeSubject.next(article);
  }

  setOpenArticle(slug: string) {
    this._openArticleSlugSubject.next(slug);
  }


  followButtonClicked(profile: Profile) {
    this._followSubject.next(profile);
  }
}
