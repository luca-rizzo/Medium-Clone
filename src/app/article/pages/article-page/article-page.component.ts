import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Profile } from 'src/app/profile/models/profile.model';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
})
export class ArticlePageComponent {

  currentFullArticle$: Observable<Article> = this._articleService.currentFullArticleWithAction$;
  isLoading$: Observable<boolean> = this._articleService.isLoadingAction$;
  commentsVisible: boolean = false;

  constructor(private readonly _route: ActivatedRoute, private readonly _articleService: ArticleService) {
    this._articleService.setOpenArticle(this._route.snapshot.paramMap.get('slug') || '');
  }

  onFollowButtonClicked(author: Profile) {
    this._articleService.followButtonClicked(author);
  }
}