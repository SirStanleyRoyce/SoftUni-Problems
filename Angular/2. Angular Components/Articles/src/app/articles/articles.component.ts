import { Component, OnInit } from '@angular/core';
import Article from '../models/article.model';
import { ArticlesData } from '../data/data';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] | undefined;

  ngOnInit(): void {
    this.articles = (new ArticlesData).getData()
  }
}
