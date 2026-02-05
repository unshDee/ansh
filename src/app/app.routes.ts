import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/blog/blog.component').then((m) => m.BlogComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
  },
  {
    path: 'resume',
    loadComponent: () =>
      import('./features/resume/resume.component').then(
        (m) => m.ResumeComponent,
      ),
  },
  {
    path: 'projects',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/projects/projects.component').then(
            (m) => m.ProjectsComponent,
          ),
      },
      {
        path: 'data-selection-peft',
        loadComponent: () =>
          import('./features/projects/projects/data-selection-peft/data-selection-peft.component').then(
            (m) => m.DataSelectionPeftComponent,
          ),
      },
      {
        path: 'fact-check-liar',
        loadComponent: () =>
          import('./features/projects/projects/fact-check-liar/fact-check-liar.component').then(
            (m) => m.FactCheckLiarComponent,
          ),
      },
      {
        path: 'program-repair-hint',
        loadComponent: () =>
          import('./features/projects/projects/program-repair-hint/program-repair-hint.component').then(
            (m) => m.ProgramRepairHintComponent,
          ),
      },
      {
        path: 'healthcare-utilization',
        loadComponent: () =>
          import('./features/projects/projects/healthcare-utilization/healthcare-utilization.component').then(
            (m) => m.HealthcareUtilizationComponent,
          ),
      },
      {
        path: 'voxart',
        loadComponent: () =>
          import('./features/projects/projects/voxart/voxart.component').then(
            (m) => m.VoxartComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent,
      ),
  },
];
