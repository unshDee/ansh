import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../core/services/analytics.service';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    // Track about page view
    this.analyticsService.trackEvent('page_view', {
      page_title: 'About',
      page_location: '/about',
    });
  }

  trackLinkClick(linkName: string, url: string) {
    this.analyticsService.trackOutboundLink(url, linkName);
  }
}
