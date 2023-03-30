import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxListComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { Observable } from 'rxjs';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, AfterViewInit {
  @ViewChild(DxListComponent) articleList!: DxListComponent;
  dataSource$!: Observable<DataSource<Article>>;
  
  @Input()
  feed: boolean = false;
  constructor(private readonly _articleService: ArticleService, private readonly _feedService: FeedService, private _router: Router) { }

  ngOnInit(): void {
    this.dataSource$ = this._articleService.dataSourceWithEditLike$;
  }

  ngAfterViewInit(): void {
    this._articleService.articleList = this.articleList;
  }

  onLikeButtonClicked(article: Article) {
    this._articleService.editLike(article);
  }

  onPreviewTitleClicked(article: Article){
    this._router.navigate(["/article", article.slug]);
  }
}
