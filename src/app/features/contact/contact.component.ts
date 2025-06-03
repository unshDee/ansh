import { Component, OnInit } from '@angular/core';
import { WindowComponent } from '../../shared/components/window/window.component';
import { AnalyticsService } from '../../core/services/analytics.service';

@Component({
  selector: 'app-contact',
  imports: [WindowComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    // Track contact page view
    this.analyticsService.trackEvent('page_view', {
      page_title: 'Contact',
      page_location: '/contact',
    });
  }

  trackContactMethod(method: string, value: string) {
    this.analyticsService.trackEvent('contact_interaction', {
      event_category: 'engagement',
      event_label: method,
      value: value,
    });
  }

  trackFormSubmission() {
    this.analyticsService.trackContactSubmission();
  }
}
