import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import ArticlePreviewComponent from './component/article-preview/article-preview.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { ArticleListComponent } from './component/article-list/article-list.component';
import { DxButtonModule, DxListModule, DxLoadPanelModule, DxScrollViewModule, DxTabPanelModule, DxTabsModule } from 'devextreme-angular';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { ArticleMetadataComponent } from './component/article-metadata/article-metadata.component';

const routes: Routes = [
  { path: "homepage", component: HomepageComponent, canActivate: [AuthGuard] },
]

@NgModule({
  declarations: [
    ArticlePreviewComponent,
    ArticleListComponent,
    HomepageComponent,
    ArticlePageComponent,
    ArticleMetadataComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DxListModule,
    RouterModule.forChild(routes),
    DxTabPanelModule,
    DxButtonModule,
    DxScrollViewModule,
    DxLoadPanelModule
  ],

})
export class ArticleModule { }
