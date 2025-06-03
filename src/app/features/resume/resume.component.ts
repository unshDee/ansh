import { Component, OnInit } from '@angular/core';
import { WindowComponent } from '../../shared/components/window/window.component';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../core/services/analytics.service';

@Component({
  selector: 'app-resume',
  imports: [RouterLink, WindowComponent],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
})
export class ResumeComponent implements OnInit {
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    // Track resume page view
    this.analyticsService.trackEvent('page_view', {
      page_title: 'Resume',
      page_location: '/resume'
    });
  }

  trackResumeDownload(format: string = 'pdf') {
    this.analyticsService.trackDownload(`resume.${format}`, format);
  }

  trackResumeView() {
    this.analyticsService.trackEvent('resume_view', {
      event_category: 'engagement',
      event_label: 'resume_viewed'
    });
  }
}
