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
  totalPages: number = 0;

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.getArticles(1);
  }

  getArticles(page: number) {
    this.articleService.getArticles(page).subscribe(res => {
      this.articles = res.rows;
      this.totalPages = res.totalPages;
    });
  }

  handleChangePage(page: number) {
    this.getArticles(page);
  }
}