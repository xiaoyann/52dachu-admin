import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ARTICLE } from '../base/api';

interface ResponseData {
  // 数据总条数
  totals: number;
  // 每页数据条数
  pageSize: number;
  // 共有多少页
  totalPages: number;
  // 当前页码
  currentPage: number;
  // 数据列表
  rows: Array<Object>;
}

@Injectable()
export class ArticleService {

  private articleUrl = ARTICLE;

  constructor(private http: Http) {}

  getArticles(page: number): Observable<ResponseData> {
    let params = new URLSearchParams();
    params.set('page', String(page));
    return this.http.get(this.articleUrl, { search: params })
      .map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

