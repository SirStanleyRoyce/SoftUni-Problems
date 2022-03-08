import { Component, Input, OnInit } from '@angular/core';
import Article from '../../models/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent {
  private symbols = 250;
  @Input() article!: Article;
  @Input() articleDesc!: string;
  descToShow: string = '';
  articleDescLen: number = 0;
  showReadMoreBtn: boolean = true;
  showHideBtn: boolean = false;
  imageIsShown: boolean = true;
  imageButtonTitle: string = 'Hide Image';

  readMore(): void {
    this.articleDescLen += this.symbols;
    this.descToShow = this.articleDesc.slice(0, this.articleDescLen);
    if (this.articleDescLen >= this.articleDesc.length) {
      this.showReadMoreBtn = false;
      this.showHideBtn = true;
    }
  }

  hideDesc(): void {
    this.articleDescLen = 0;
    this.descToShow = '';
    if (this.articleDescLen <= 0) {
      this.showHideBtn = false;
      this.showReadMoreBtn = true;
    }
  }

  toggleImage(): void {
    this.imageIsShown = !this.imageIsShown;
    this.imageButtonTitle = this.imageIsShown ? 'Hide Image' : 'Show Image';
  }
}
