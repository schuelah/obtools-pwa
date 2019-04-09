import {Component, Input, OnInit} from '@angular/core';

export interface Citation {
  source?: string;
  accessed?: any;
  id?: string;
  title?: string;
  author?: Array<Name>;
  'container-title-short'?: string;
  'container-title'?: string;
  ISSN?: string;
  issued?: any;
  page?: string;
  volume?: string;
  issue?: string;
  PMID?: string;
  PMCID?: string;
  DOI?: string;
  type?: string;
}

export interface DateParts {
  'date-parts': [[number, number?, number?]];
}

export interface Name {
  family?: string;
  given?: string;
}

@Component({
  selector: 'app-article-citation',
  templateUrl: './article-citation.component.html',
  styleUrls: ['./article-citation.component.css']
})
export class ArticleCitationComponent implements OnInit {
  @Input() ref: Citation;

  constructor() { }

  ngOnInit() { }

}
