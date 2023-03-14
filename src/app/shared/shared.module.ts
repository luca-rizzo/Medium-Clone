import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DxTabsModule, DxTextBoxModule } from 'devextreme-angular';
import { ArticleModule } from '../article/article.module';


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    DxTextBoxModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
