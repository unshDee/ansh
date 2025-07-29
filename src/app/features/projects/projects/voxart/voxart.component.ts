import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectTemplateComponent } from '../../shared/project-template/project-template.component';
import { WindowComponent } from '../../../../shared/components/window/window.component';
import { AnalyticsService } from '../../../../core/services/analytics.service';

@Component({
  selector: 'app-voxart',
  imports: [CommonModule, ProjectTemplateComponent, WindowComponent],
  templateUrl: './voxart.component.html',
  styleUrl: './voxart.component.css',
})
export class VoxartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('speechMetricsChart', { static: false })
  speechMetricsChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('performanceChart', { static: false })
  performanceChart!: ElementRef<HTMLCanvasElement>;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    // Track project page view
    this.analyticsService.trackProjectView('VoxArt');
    this.analyticsService.trackEvent('page_view', {
      page_title: 'VoxArt - Speech-to-Image Synthesis',
      page_location: '/projects/voxart',
      project_category: 'ai-research',
    });
  }

  ngAfterViewInit() {
    // Charts will be implemented if needed
  }

  ngOnDestroy() {
    // Cleanup if needed
  }
}
