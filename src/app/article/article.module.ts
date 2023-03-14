import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './component/article/article.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { ArticleListComponent } from './component/article-list/article-list.component';
import { DxButtonModule, DxListModule, DxTabPanelModule, DxTabsModule } from 'devextreme-angular';
import { HomepageComponent } from './pages/homepage/homepage.component';

const routes: Routes = [
  { path: "articles", component: HomepageComponent, canActivate: [AuthGuard] },
]

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleListComponent,
    HomepageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DxListModule,
    RouterModule.forChild(routes),
    DxTabPanelModule,
    DxButtonModule
  ],
  
})
export class ArticleModule { }
