import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../../service/article.service';

@Component({
  selector: 'article',
  templateUrl: 'article.component.html',
  styleUrls: [ 'article.component.scss' ],
  providers: [ ArticleService ]
})
export class ArticleComponent implements OnInit {

  articles: Array<Object>;

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.articleService.getArticles().subscribe(
      res => this.articles = res.articles);
  }
}