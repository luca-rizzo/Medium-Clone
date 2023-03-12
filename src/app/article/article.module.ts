import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './component/article/article.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { ArticleListPageComponent } from './pages/article-list-page/article-list-page.component';
import { DxListModule } from 'devextreme-angular';

const routes: Routes = [
  { path: "articles", component: ArticleListPageComponent, canActivate: [AuthGuard] },
]

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleListPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DxListModule,
    RouterModule.forChild(routes)
  ]
})
export class ArticleModule { }
