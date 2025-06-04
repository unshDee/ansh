import { Component, OnInit } from '@angular/core';
import { ProjectTemplateComponent } from '../../shared/project-template/project-template.component';
import { WindowComponent } from '../../../../shared/components/window/window.component';
import { SafeLatexPipe } from '../../../../shared/pipes';
import { AnalyticsService } from '../../../../core/services/analytics.service';

@Component({
  selector: 'app-program-repair-hint',
  imports: [ProjectTemplateComponent, WindowComponent, SafeLatexPipe],
  templateUrl: './program-repair-hint.component.html',
  styleUrl: './program-repair-hint.component.css',
})
export class ProgramRepairHintComponent implements OnInit {
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    // Track project page view
    this.analyticsService.trackProjectView(
      'Program Repair and Hint Generation',
    );
    this.analyticsService.trackEvent('page_view', {
      page_title: 'Program Repair and Hint Generation',
      page_location: '/projects/program-repair-hint',
      project_category: 'generative-ai',
    });
  }

  trackDemoClick() {
    this.analyticsService.trackEvent('demo_click', {
      event_category: 'engagement',
      event_label: 'program-repair-demo',
      project_name: 'Program Repair and Hint Generation',
    });
  }

  trackGitHubClick() {
    this.analyticsService.trackOutboundLink('#', 'Program Repair GitHub');
  }
}
