import { Component, OnInit } from '@angular/core';
import { WindowComponent } from '../../shared/components/window/window.component';
import { RouterLink } from '@angular/router';
import { ProjectTemplateComponent } from './shared/project-template/project-template.component';
import { AnalyticsService } from '../../core/services/analytics.service';

@Component({
  selector: 'app-projects',
  imports: [RouterLink, WindowComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    // Track projects page view
    this.analyticsService.trackEvent('page_view', {
      page_title: 'Projects',
      page_location: '/projects'
    });
  }

  trackProjectClick(projectName: string) {
    this.analyticsService.trackProjectView(projectName);
  }
}
