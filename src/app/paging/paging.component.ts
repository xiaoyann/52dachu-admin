import { Component } from '@angular/core';

@Component({
  selector: 'paging',
  template: `
    <div class="wrapper">
      <a (click)="firstPage()" class="page disable">首页</a>
      <a (click)="previousPage()" class="page">上一页</a>
      <a class="page">1</a>
      <a class="page">2</a>
      <a class="page">3</a>
      <a class="page">4</a>
      <a class="page">5</a>
      <span>...</span>
      <a (click)="nextPage()" class="page">下一页</a>
      <a (click)="lastPage()" class="page">尾页</a>
      <span>共 {{totalPages}} 页</span>
      <span>当前</span>
      <input />
      <span>页</span>
      <button>确定</button>
    </div>
  `,
  styleUrls: [ './paging.component.scss' ]
})
export class PagingComponent {
  // 当前所在页码
  currentPage: number = 2;
  // 总页数
  totalPages: number = 50;
  // 展示多少个页码
  size: number = 5;

  changePage(page: number) {
    console.log(page)
  }

  previousPage() {

  }

  nextPage() {

  }

  firstPage() {

  }

  lastPage() {

  }

  calculatePages() {
    let size = this.size;
    let currentPage = this.currentPage;
    let totalPages = this.totalPages;
    let min: number = 1;
    let max: number = 0;
    let pages: Array<number> = [];
    
    if (currentPage <= size) {  
      // 当前页码小于要显示的页码总数时，要展示的最大页码为 size
      // 但如果总页数小于了 size, 最大页码为总页数
      max = size >= totalPages ? totalPages : size;
    } else {
      // 当前页码居中
      max = currentPage + Math.floor(size / 2);
      if (max > totalPages) max = totalPages;
      min = max - size + 1;    
    }

    for (; min <= max; min++) pages.push(min);
  }
}







