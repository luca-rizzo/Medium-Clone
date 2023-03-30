import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DxTabsModule, DxTextBoxModule } from 'devextreme-angular';
import { ArticleModule } from '../article/article.module';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { ReplaceStringPipe } from './pipes/replace-string.pipe';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
    MarkdownPipe,
    ReplaceStringPipe,
  ],
  imports: [
    CommonModule,
    DxTextBoxModule,
    RouterModule.forChild([])
  ],
  exports: [
    HeaderComponent,
    MarkdownPipe,
    ReplaceStringPipe
  ]
})
export class SharedModule { }
