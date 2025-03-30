import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { BlogComponent } from './features/blog/blog.component';
import { ContactComponent } from './features/contact/contact.component';
import { ResumeComponent } from './features/resume/resume.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';

// projects
import { DataSelectionPeftComponent } from './features/projects/projects/data-selection-peft/data-selection-peft.component';
import { FactCheckLiarComponent } from './features/projects/projects/fact-check-liar/fact-check-liar.component';
import { ProgramRepairHintComponent } from './features/projects/projects/program-repair-hint/program-repair-hint.component';
import { HealthcareUtilizationComponent } from './features/projects/projects/healthcare-utilization/healthcare-utilization.component';
import { VoxartComponent } from './features/projects/projects/voxart/voxart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'resume', component: ResumeComponent },
  {
    path: 'projects',
    children: [
      { path: '', component: ProjectsComponent },
      { path: 'data-selection-peft', component: DataSelectionPeftComponent },
      { path: 'fact-check-liar', component: FactCheckLiarComponent },
      { path: 'program-repair-hint', component: ProgramRepairHintComponent },
      {
        path: 'healthcare-utilization',
        component: HealthcareUtilizationComponent,
      },
      { path: 'voxart', component: VoxartComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
