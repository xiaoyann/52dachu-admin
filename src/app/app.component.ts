import { Component } from '@angular/core';

@Component({
  selector: 'root',
  template: `
    <header></header>
    <div class="content">
      <sidebar></sidebar>
      <div class="main">
        <breadcrumb></breadcrumb>
        <router-outlet></router-outlet>
      </div>  
    </div>
  `,
  styleUrls: [ 'app.component.scss' ]
})
export class AppComponent { }