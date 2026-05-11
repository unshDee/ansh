import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../core/services/analytics.service';
import { SlimeAsciiComponent } from '../../shared/components/slime-ascii/slime-ascii.component';
import type { SlimeConfig } from '../../shared/components/slime-ascii/slime-ascii.types';

@Component({
  selector: 'app-about',
  imports: [RouterLink, SlimeAsciiComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  readonly bgSlimeConfig: SlimeConfig = {
    agentCount: 1500,
    sensorDistance: 9,
    sensorAngle: 0.75,
    agentAngle: 0.75,
    agentSpeed: 2,
    decay: 0.8,
    minChem: 0.0001,
    deposit: 1,
    textureRows: ['  ``^@', ' ..„v0'],
    gridWidth: 200,
    gridHeight: 200,
    simIterations: 0,
    seed: 22,
    scatterPeriod: 150,
    scatterThreshold: 0.5,
  };

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
