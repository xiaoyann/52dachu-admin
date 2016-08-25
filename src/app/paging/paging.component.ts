import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'paging',
  templateUrl: './paging.component.html',
  styleUrls: [ './paging.component.scss' ]
})
export class PagingComponent implements OnInit {
  
  // 当前所在页码
  currentPage: number = 1;
  
  // 总页数
  @Input() totalPages: number = 0;
  
  // 展示多少个页码
  size: number = 5;
  
  // 要显示的页码
  pages: Array<number>;

  @Output() onChangePage = new EventEmitter();

  ngOnInit() {
    this.calculatePages();
  }

  ngOnChanges(changes: Object) {
    // totalPages 改变时需要重新计算页码
    this.calculatePages();
  }

  changePage(page: number) {
    if (page !== this.currentPage) {
      this.currentPage = page;
      // 每次当前页码改变时都需要重新计算页码
      this.calculatePages();
      // 
      this.onChangePage.emit(page);
    }
  }

  previousPage() {
    let page = this.currentPage - 1;
    this.changePage(page <= 0 ? 1 : page);
  }

  nextPage() {
    let page = this.currentPage + 1;
    this.changePage(page > this.totalPages ? this.totalPages : page);
  }

  firstPage() {
    this.changePage(1);
  }

  lastPage() {
    this.changePage(this.totalPages);
  }

  calculatePages() {
    let size = this.size;
    let totalPages = this.totalPages;
    let currentPage = this.currentPage;
    let min: number = 1;
    let max: number = 0;
    let pages: Array<number> = [];

    if (currentPage < size) {  
      // 当前页码小于要显示的页码总数时，要展示的最大页码为 size
      // 但如果总页数小于了 size, 最大页码为总页数
      max = size >= totalPages ? totalPages : size;
    } else {
      // 当前页码居中
      max = currentPage + Math.floor(size / 2);
      if (max > totalPages) max = totalPages;
      min = max - size + 1;    
    }

    for (; min <= max; min++) {
      pages.push(min);
    }
    
    this.pages = pages;
  }
}







