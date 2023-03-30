import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ARTICLE, ARTICLES_ENDPOINT, ARTICLE_COMMENTS, ARTICLE_FAVORITES_ENDPOINT } from '../endpoint/endpoint';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceWs {

  constructor(private readonly _httpClient: HttpClient) {

  }

  getArticles(startIndex?: number, pageSize?: number): Observable<{ articles: Article[], articleCount: number }> {
    let params: HttpParams = new HttpParams();
    if (startIndex) {
      params = params.append('offset', startIndex);
    }
    if (pageSize) {
      params = params.append('limit', pageSize);
    }
    const url = environment.api_url.concat(ARTICLES_ENDPOINT);
    return this._httpClient.get<{ articles: Article[], articleCount: number }>(url, { params });
  }

  getArticle(slug: string): Observable<{ article: Article }> {
    const url = environment.api_url.concat(ARTICLE).replace(':slug', slug);;
    return this._httpClient.get<{ article: Article }>(url);
  }

  getCommentsOfArticle(slug: string): Observable<{comments: Comment[]}> {
    const url = environment.api_url.concat(ARTICLE_COMMENTS).replace(':slug', slug);
    return this._httpClient.get<{comments: Comment[]}>(url);
  }

  addLike(slug: string): Observable<{article: Article}>{
    const url = environment.api_url.concat(ARTICLE_FAVORITES_ENDPOINT).replace(':slug', slug);
    return this._httpClient.post<{article: Article}>(url, {});
  }

  removeLike(slug: string): Observable<{article: Article}>{
    const url = environment.api_url.concat(ARTICLE_FAVORITES_ENDPOINT).replace(':slug', slug);
    return this._httpClient.delete<{article: Article}>(url, {});
  }
}
