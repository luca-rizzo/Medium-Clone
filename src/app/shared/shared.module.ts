import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DxTextBoxModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    HeaderComponent
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
