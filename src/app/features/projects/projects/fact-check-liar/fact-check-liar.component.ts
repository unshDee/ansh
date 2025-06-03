import { Component, OnInit } from '@angular/core';
import { ProjectTemplateComponent } from '../../shared/project-template/project-template.component';
import { WindowComponent } from '../../../../shared/components/window/window.component';
import { AnalyticsService } from '../../../../core/services/analytics.service';

@Component({
  selector: 'app-fact-check-liar',
  imports: [ProjectTemplateComponent, WindowComponent],
  templateUrl: './fact-check-liar.component.html',
  styleUrl: './fact-check-liar.component.css',
})
export class FactCheckLiarComponent implements OnInit {
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    // Track project page view
    this.analyticsService.trackProjectView('Fact Check LIAR Dataset');
    this.analyticsService.trackEvent('page_view', {
      page_title: 'Fact Check LIAR Dataset',
      page_location: '/projects/fact-check-liar',
      project_category: 'machine-learning'
    });
  }
}
