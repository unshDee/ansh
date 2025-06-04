import { Component, OnInit } from '@angular/core';
import { ProjectTemplateComponent } from '../../shared/project-template/project-template.component';
import { AnalyticsService } from '../../../../core/services/analytics.service';

@Component({
  selector: 'app-voxart',
  imports: [ProjectTemplateComponent],
  templateUrl: './voxart.component.html',
  styleUrl: './voxart.component.css',
})
export class VoxartComponent implements OnInit {
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    // Track project page view
    this.analyticsService.trackProjectView('VoxArt');
    this.analyticsService.trackEvent('page_view', {
      page_title: 'VoxArt',
      page_location: '/projects/voxart',
      project_category: 'web-development',
    });
  }
}
