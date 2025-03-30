import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { WindowComponent } from '../../../../shared/components/window/window.component';

@Component({
  selector: 'app-project-template',
  imports: [RouterLink, WindowComponent],
  templateUrl: './project-template.component.html',
  styleUrl: './project-template.component.css',
})
export class ProjectTemplateComponent {
  @Input() projectTitle: string = '';
  @Input() note: string = '';
  @Input() projectLink: string = '';
  @Input() demo: string = '';
  @Input() demoLink: string = '';
  @Input() technologies: string[] = [];
}
