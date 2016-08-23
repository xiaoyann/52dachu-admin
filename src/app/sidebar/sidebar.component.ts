import { Component } from '@angular/core';

@Component({
  selector: 'sidebar',
  template: `
    <div class="sidebar">
      <ul>
        <li class="nav" routerLink="/dashboard" routerLinkActive="active">
          <i class="icon-home"></i>
          <span>管理首页</span>
        </li>
        <li class="nav" routerLink="/article" routerLinkActive="active">
          <i class="icon-article"></i>
          <span>文章管理</span>
        </li>
        <li class="nav" routerLink="/cate" routerLinkActive="active">
          <i class="icon-cate"></i>
          <span>分类管理</span>
        </li>
        <li class="nav" routerLink="/tag" routerLinkActive="active">
          <i class="icon-tag"></i>
          <span>标签管理</span>
        </li>
        <li class="nav" routerLink="/system" routerLinkActive="active">
          <i class="icon-system"></i>
          <span>系统设置</span>
        </li>
      </ul>
    </div>
  `,
  styleUrls: [ 'sidebar.component.scss' ]
})
export class SidebarComponent {}