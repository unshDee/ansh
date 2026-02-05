import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  effect,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { ProjectTemplateComponent } from '../../shared/project-template/project-template.component';
import { WindowComponent } from '../../../../shared/components/window/window.component';
import { SafeLatexPipe } from '../../../../shared/pipes';
import { AnalyticsService } from '../../../../core/services/analytics.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'app-image-segmentation',
  imports: [ProjectTemplateComponent, WindowComponent, SafeLatexPipe],
  templateUrl: './image-segmentation.component.html',
  styleUrl: './image-segmentation.component.css',
})
export class ImageSegmentationComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('augmentationChart', { static: false })
  augmentationChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('posWeightChart', { static: false })
  posWeightChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('batchSizeChart', { static: false })
  batchSizeChart!: ElementRef<HTMLCanvasElement>;

  private charts: Chart[] = [];

  constructor(
    private analyticsService: AnalyticsService,
    private themeService: ThemeService,
  ) {
    Chart.register(...registerables);
    effect(() => {
      const currentTheme = this.themeService.theme();
      setTimeout(() => {
        this.updateChartsForTheme(currentTheme);
      }, 100);
    });
  }

  ngOnInit() {
    this.analyticsService.trackProjectView(
      'Image Segmentation with Scribble Supervision',
    );
    this.analyticsService.trackEvent('page_view', {
      page_title: 'Image Segmentation with Scribble Supervision',
      page_location: '/projects/image-segmentation',
      project_category: 'computer-vision',
    });
  }

  ngAfterViewInit() {
    this.createAugmentationChart();
    this.createPosWeightChart();
    this.createBatchSizeChart();
  }

  ngOnDestroy() {
    this.charts.forEach((chart) => chart.destroy());
  }

  private getThemeColors() {
    const isDark = this.themeService.theme() === 'dark';
    return {
      text: isDark ? '#e0e0e0' : '#252525',
      border: isDark ? '#444444' : '#dddddd',
      background: isDark ? '#1c1c1c' : '#ffffff',
      primary: isDark ? '#fe6060' : '#db0000',
      secondary: isDark ? '#ffffff' : '#000000',
      green: isDark ? '#4ade80' : '#15803d',
      orange: isDark ? '#fb923c' : '#ea580c',
      amber: isDark ? '#fbbf24' : '#d97706',
      yellow: isDark ? '#facc15' : '#eab308',
      blue: isDark ? '#60a5fa' : '#2563eb',
    };
  }

  private updateChartsForTheme(theme: string) {
    if (this.charts.length === 0) return;

    const colors = this.getThemeColors();

    this.charts.forEach((chart) => {
      if (chart.options.plugins?.title) {
        chart.options.plugins.title.color = colors.text;
      }
      if (chart.options.plugins?.legend?.labels) {
        chart.options.plugins.legend.labels.color = colors.text;
      }

      if (chart.options.scales) {
        Object.values(chart.options.scales).forEach((scale) => {
          if (scale && typeof scale === 'object') {
            if ('ticks' in scale && scale.ticks) {
              (scale.ticks as any).color = colors.text;
            }
            if ('title' in scale && scale.title) {
              (scale.title as any).color = colors.text;
            }
            if ('grid' in scale && scale.grid) {
              (scale.grid as any).color = colors.border;
            }
          }
        });
      }

      chart.update('none');
    });
  }

  private createAugmentationChart() {
    const ctx = this.augmentationChart.nativeElement.getContext('2d');
    if (!ctx) return;

    const colors = this.getThemeColors();

    // Average mIoU across all batch sizes and pos_weights for each loss+aug combination
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Low Aug', 'Medium Aug', 'High Aug'],
        datasets: [
          {
            label: 'IoU Loss',
            data: [0.8683, 0.8634, 0.8575],
            backgroundColor: colors.primary,
            borderColor: colors.text,
            borderWidth: 1,
          },
          {
            label: 'Dice Loss',
            data: [0.8688, 0.8596, 0.8567],
            backgroundColor: colors.amber,
            borderColor: colors.text,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: true,
            labels: {
              color: colors.text,
              font: { size: 12 },
            },
          },
        },
        scales: {
          x: {
            ticks: { color: colors.text },
            grid: { color: colors.border },
          },
          y: {
            beginAtZero: false,
            min: 0.84,
            max: 0.88,
            ticks: { color: colors.text },
            grid: { color: colors.border },
            title: {
              display: true,
              text: 'Mean IoU',
              color: colors.text,
            },
          },
        },
      },
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }

  private createPosWeightChart() {
    const ctx = this.posWeightChart.nativeElement.getContext('2d');
    if (!ctx) return;

    const colors = this.getThemeColors();

    // Average across batch sizes for low aug (best performing)
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['1.0', '2.0', '3.0', '3.8'],
        datasets: [
          {
            label: 'IoU + Low Aug',
            data: [0.8673, 0.8656, 0.8720, 0.8683],
            borderColor: colors.primary,
            backgroundColor: `${colors.primary}30`,
            pointBackgroundColor: colors.primary,
            pointBorderColor: colors.text,
            tension: 0.3,
            fill: true,
          },
          {
            label: 'Dice + Low Aug',
            data: [0.8666, 0.8681, 0.8690, 0.8704],
            borderColor: colors.amber,
            backgroundColor: `${colors.amber}30`,
            pointBackgroundColor: colors.amber,
            pointBorderColor: colors.text,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: true,
            labels: {
              color: colors.text,
              font: { size: 12 },
            },
          },
        },
        scales: {
          x: {
            ticks: { color: colors.text },
            grid: { color: colors.border },
            title: {
              display: true,
              text: 'Positive Weight (p_c)',
              color: colors.text,
            },
          },
          y: {
            beginAtZero: false,
            min: 0.86,
            max: 0.88,
            ticks: { color: colors.text },
            grid: { color: colors.border },
            title: {
              display: true,
              text: 'Mean IoU',
              color: colors.text,
            },
          },
        },
      },
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }

  private createBatchSizeChart() {
    const ctx = this.batchSizeChart.nativeElement.getContext('2d');
    if (!ctx) return;

    const colors = this.getThemeColors();

    // Best config (IoU + Low Aug) across batch sizes, averaged over pos_weights
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Batch 6', 'Batch 8', 'Batch 12'],
        datasets: [
          {
            label: 'IoU + Low Aug',
            data: [0.8688, 0.8682, 0.8681],
            backgroundColor: [colors.green, colors.amber, colors.orange],
            borderColor: colors.text,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: { color: colors.text },
            grid: { color: colors.border },
          },
          y: {
            beginAtZero: false,
            min: 0.865,
            max: 0.870,
            ticks: { color: colors.text },
            grid: { color: colors.border },
            title: {
              display: true,
              text: 'Mean IoU',
              color: colors.text,
            },
          },
        },
      },
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }
}
