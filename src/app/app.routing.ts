import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleComponent } from './article/article.component';
import { CateComponent } from './cate/cate.component';
import { TagComponent } from './tag/tag.component';
import { SystemComponent } from './system/system.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'article',
    component: ArticleComponent
  },
  {
    path: 'cate',
    component: CateComponent
  },
  {
    path: 'tag',
    component: TagComponent
  },
  {
    path: 'system',
    component: SystemComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

export const routing = RouterModule.forRoot(appRoutes)


