import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleCitationComponent} from './article-citation.component';

@NgModule({
  declarations: [ArticleCitationComponent],
  exports: [
    ArticleCitationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReferenceModule { }
