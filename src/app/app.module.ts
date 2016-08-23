import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleComponent } from './article/article.component';
import { CateComponent } from './cate/cate.component';
import { TagComponent } from './tag/tag.component';
import { SystemComponent } from './system/system.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule, routing
  ],
  declarations: [
    AppComponent, HeaderComponent, 
    SidebarComponent, DashboardComponent,
    ArticleComponent, CateComponent,
    TagComponent, SystemComponent,
    BreadcrumbComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
