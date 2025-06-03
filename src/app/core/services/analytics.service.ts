import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private router: Router) {
    // Track route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.trackPageView(event.urlAfterRedirects);
    });
  }
  /**
   * Track page views
   */
  trackPageView(url: string) {
    if (typeof gtag !== 'undefined') {
      gtag('config', environment.googleAnalyticsId, {
        page_path: url
      });
    }
  }

  /**
   * Track custom events
   */
  trackEvent(eventName: string, parameters: any = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, parameters);
    }
  }

  /**
   * Track outbound links
   */
  trackOutboundLink(url: string, linkText: string = '') {
    this.trackEvent('click', {
      event_category: 'outbound',
      event_label: url,
      value: linkText
    });
  }

  /**
   * Track downloads
   */
  trackDownload(fileName: string, fileType: string = '') {
    this.trackEvent('download', {
      event_category: 'engagement',
      event_label: fileName,
      value: fileType
    });
  }

  /**
   * Track project views
   */
  trackProjectView(projectName: string) {
    this.trackEvent('view_project', {
      event_category: 'engagement',
      event_label: projectName
    });
  }

  /**
   * Track contact form submissions
   */
  trackContactSubmission() {
    this.trackEvent('contact_form_submit', {
      event_category: 'engagement',
      event_label: 'contact_form'
    });
  }
}
