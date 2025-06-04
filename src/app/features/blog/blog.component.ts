import { Component, OnInit } from '@angular/core';
import { WindowComponent } from '../../shared/components/window/window.component';
import { AnalyticsService } from '../../core/services/analytics.service';

@Component({
  selector: 'app-blog',
  imports: [WindowComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit {
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    // Track blog page view
    this.analyticsService.trackEvent('page_view', {
      page_title: 'Blog',
      page_location: '/blog',
    });
  }

  trackBlogPostClick(postTitle: string, postUrl?: string) {
    this.analyticsService.trackEvent('blog_post_click', {
      event_category: 'engagement',
      event_label: postTitle,
      value: postUrl || postTitle,
    });
  }

  trackExternalBlogLink(url: string, linkText: string) {
    this.analyticsService.trackOutboundLink(url, linkText);
  }
}
