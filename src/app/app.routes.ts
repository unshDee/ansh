import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {BlogComponent} from './blog/blog.component';
import {ContactComponent} from './contact/contact.component';
import {DeepComponent} from './deep/deep.component';

export const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "about", component: AboutComponent},
  {path: "blog", component: BlogComponent},
  {path: "blog/:id", component: BlogComponent},
  {path: "contact", component: ContactComponent},
  {path: "deep", component: DeepComponent},
  {path: "*", redirectTo: "", pathMatch: "full"}
];
