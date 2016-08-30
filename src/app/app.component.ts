import { Component } from '@angular/core';
import './rxjs-operators';
import '../css/reset.css';

@Component({
  selector: 'root',
  template: `
    <header></header>
    <div class="content">
      <sidebar></sidebar>
      <div class="main">
        <breadcrumb></breadcrumb>
        <div class="main-bd">
          <router-outlet></router-outlet>
        </div>
      </div>  
    </div>
  `,
  styleUrls: [ 'app.component.scss' ]
})
export class AppComponent { }