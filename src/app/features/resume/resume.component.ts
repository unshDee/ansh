import { Component } from '@angular/core';
import { WindowComponent } from '../../shared/components/window/window.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resume',
  imports: [RouterLink, WindowComponent],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
})
export class ResumeComponent {}
