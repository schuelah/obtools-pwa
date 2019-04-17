import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleCitationComponent} from './article-citation.component';
import {ToolsModule} from '../tools/tools.module';

@NgModule({
  declarations: [ArticleCitationComponent],
  exports: [
    ArticleCitationComponent
  ],
  imports: [
    CommonModule,
    ToolsModule
  ]
})
export class ReferenceModule { }
