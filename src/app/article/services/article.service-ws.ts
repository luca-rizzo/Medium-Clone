import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ARTICLES_ENDPOINT } from '../endpoint/endpoint';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceWs {

  constructor(private readonly _httpClient: HttpClient) {
    
  }

  getArticles(startIndex?: number, pageSize?: number): Observable<{articles: Article[], articleCount: number}>{
    let params: HttpParams = new HttpParams();
    if(startIndex) {
      params = params.append('offset', startIndex);
    }
    if(pageSize){
      params = params.append('limit', pageSize);
    }
    const url = environment.api_url.concat(ARTICLES_ENDPOINT);
    return this._httpClient.get<{articles: Article[], articleCount: number}>(url, { params });
  }
}
