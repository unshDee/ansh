import { Component } from '@angular/core';
import { WindowComponent } from '../../shared/components/window/window.component';
import { RouterLink } from '@angular/router';
import { ProjectTemplateComponent } from './shared/project-template/project-template.component';

@Component({
  selector: 'app-projects',
  imports: [RouterLink, WindowComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {}
