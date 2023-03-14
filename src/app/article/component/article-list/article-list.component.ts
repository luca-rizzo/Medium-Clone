import { Component, Input, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  dataSource = this._articleService.articleDataSource;
  @Input()
  feed: boolean = false;
  constructor(private readonly _articleService: ArticleService, private readonly _feedService: FeedService) { }

  ngOnInit(): void {
    this.dataSource = this.feed ? this._feedService.feedDataSource : this._articleService.articleDataSource;
  }


}
