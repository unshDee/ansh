import { Component, OnInit } from '@angular/core';
import { WindowComponent } from '../../shared/components/window/window.component';
import { AnalyticsService } from '../../core/services/analytics.service';
import { SlimeAsciiComponent } from '../../shared/components/slime-ascii/slime-ascii.component';
import type { SlimeConfig } from '../../shared/components/slime-ascii/slime-ascii.types';

@Component({
  selector: 'app-contact',
  imports: [WindowComponent, SlimeAsciiComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  readonly slimeConfig: SlimeConfig = {
    agentCount: 800,
    sensorDistance: 9,
    sensorAngle: 0.85,
    agentAngle: 0.85,
    agentSpeed: 1.5,
    decay: 0.9,
    minChem: 0.155,
    deposit: 1,
    textureRows: ['  ``^@', ' ..„v0'],
    gridWidth: 150,
    gridHeight: 50,
    simIterations: 500,
    seed: 2002,
    scatterPeriod: 200,
    scatterThreshold: 0.45,
    boundaryRadius: 0.88,
    charAspect: 0.55,
    gamma: 0.433,
    targetFps: 12,
  };

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    // Track contact page view
    this.analyticsService.trackEvent('page_view', {
      page_title: 'Contact',
      page_location: '/contact',
    });
  }

  // Decode email to prevent scraping while allowing user display
  getEmail(): string {
    return atob('YW5zaC5kYXdkYUBnbWFpbC5jb20=');
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
