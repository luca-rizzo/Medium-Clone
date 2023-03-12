import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit{
  ngOnInit(): void {
    console.log(this.article)
  }
  @Input()
  article: Article | undefined = {} as Article;
}
