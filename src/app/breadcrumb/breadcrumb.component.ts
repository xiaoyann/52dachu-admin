import { Component } from '@angular/core';

@Component({
  selector: 'breadcrumb',
  template: `
    <div class="wrapper">
      <div class="main">
        <span>管理首页</span>
        <i>/</i>
        <span>文章管理</span>
        <i>/</i>
        <span class="disable">文章列表</span>
      </div>
    </div>
  `,
  styleUrls: [ 'breadcrumb.component.scss' ]
})
export class BreadcrumbComponent {}