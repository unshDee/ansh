import { Component, OnInit } from '@angular/core';
import { WindowComponent } from '../../shared/components/window/window.component';
import { AnalyticsService } from '../../core/services/analytics.service';

@Component({
  selector: 'app-home',
  imports: [WindowComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    // Track home page view
    this.analyticsService.trackEvent('page_view', {
      page_title: 'Home',
      page_location: '/home',
    });
  }
}
