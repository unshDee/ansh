import { Component } from '@angular/core';
import { ProjectTemplateComponent } from '../../shared/project-template/project-template.component';
import { WindowComponent } from '../../../../shared/components/window/window.component';

@Component({
  selector: 'app-fact-check-liar',
  imports: [ProjectTemplateComponent, WindowComponent],
  templateUrl: './fact-check-liar.component.html',
  styleUrl: './fact-check-liar.component.css',
})
export class FactCheckLiarComponent {}
