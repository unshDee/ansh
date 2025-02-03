import {Routes} from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {AboutComponent} from './features/about/about.component';
import {BlogComponent} from './features/blog/blog.component';
import {ContactComponent} from './features/contact/contact.component';
import {ProjectsComponent} from './features/projects/projects.component';
import {PageNotFoundComponent} from './features/page-not-found/page-not-found.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'contact', component: ContactComponent},
  {path: '**', component: PageNotFoundComponent}
];
