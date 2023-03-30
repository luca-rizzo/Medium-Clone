import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export default class ArticlePreviewComponent {
  @Input()
  article: Article = {} as Article;
  @Output()
  onLikeButtonClicked: EventEmitter<Article> = new EventEmitter();

  likeButtonClicked() {
    this.onLikeButtonClicked.emit(this.article);
  }

}
