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
  selector: 'app-healthcare-utilization',
  imports: [NgIf, ProjectTemplateComponent, WindowComponent, SafeLatexPipe],
  templateUrl: './healthcare-utilization.component.html',
  styleUrl: './healthcare-utilization.component.css',
})
export class HealthcareUtilizationComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('regressionChart', { static: false })
  regressionChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('classificationChart', { static: false })
  classificationChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('classificationReportChart', { static: false })
  classificationReportChart!: ElementRef<HTMLCanvasElement>;

  private charts: Chart[] = [];
  showDetailedView = false;

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
    this.analyticsService.trackProjectView('Healthcare Utilization Prediction');
    this.analyticsService.trackEvent('page_view', {
      page_title: 'Healthcare Utilization Prediction',
      page_location: '/projects/healthcare-utilization',
      project_category: 'machine-learning',
    });
  }

  ngAfterViewInit() {
    this.createRegressionChart();
    this.createClassificationChart();
    this.createClassificationReportChart();
  }

  toggleDetailedView() {
    this.showDetailedView = !this.showDetailedView;
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

    this.charts.forEach((chart, index) => {
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

      chart.data.datasets.forEach((dataset: any, datasetIndex) => {
        if (index === 0) {
          // Regression Chart - Line with fill
          dataset.backgroundColor = `${colors.primary}15`;
          dataset.borderColor = colors.primary;
          dataset.pointBackgroundColor = colors.primary;
          dataset.pointBorderColor = colors.text;
        } else if (index === 1) {
          // Classification Chart - Radar
          if (datasetIndex === 0) {
            dataset.backgroundColor = `${colors.primary}30`;
            dataset.borderColor = colors.primary;
            dataset.pointBackgroundColor = colors.primary;
            dataset.pointBorderColor = colors.text;
          } else if (datasetIndex === 1) {
            dataset.backgroundColor = `${colors.amber}30`;
            dataset.borderColor = colors.amber;
            dataset.pointBackgroundColor = colors.amber;
            dataset.pointBorderColor = colors.text;
          } else if (datasetIndex === 2) {
            dataset.backgroundColor = `${colors.green}30`;
            dataset.borderColor = colors.green;
            dataset.pointBackgroundColor = colors.green;
            dataset.pointBorderColor = colors.text;
          }
        } else if (index === 2) {
          // Classification Report Chart - Doughnut
          if (datasetIndex === 0) {
            dataset.backgroundColor = [colors.primary, colors.green];
            dataset.borderColor = colors.text;
          }
        }
      });

      chart.update('none');
    });
  }

  private createRegressionChart() {
    const ctx = this.regressionChart.nativeElement.getContext('2d');
    if (!ctx) return;

    const colors = this.getThemeColors();

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: [
          'Linear\nRegression',
          'ElasticNet',
          'Random Forest',
          'XGBoost',
        ],
        datasets: [
          {
            label: 'RMSE (Test)',
            data: [11131.18, 10964.77, 12012.17, 12298.58],
            backgroundColor: `${colors.primary}15`,
            borderColor: colors.primary,
            borderWidth: 3,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBorderWidth: 2,
            pointBackgroundColor: colors.primary,
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
              font: {
                size: 12,
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              color: colors.text,
            },
            title: {
              display: true,
              text: 'RMSE',
              color: colors.text,
            },
            grid: {
              color: colors.border,
            },
          },
          x: {
            ticks: {
              color: colors.text,
            },
            grid: {
              color: colors.border,
              display: false,
            },
          },
        },
      },
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }

  private createClassificationChart() {
    const ctx = this.classificationChart.nativeElement.getContext('2d');
    if (!ctx) return;

    const colors = this.getThemeColors();

    const config: ChartConfiguration = {
      type: 'radar',
      data: {
        labels: ['Accuracy', 'Precision', 'Recall', 'F1 Score'],
        datasets: [
          {
            label: 'Logistic Regression',
            data: [0.796, 0.829, 0.796, 0.711],
            backgroundColor: `${colors.primary}30`,
            borderColor: colors.primary,
            borderWidth: 2,
            pointBackgroundColor: colors.primary,
            pointBorderColor: colors.text,
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
          {
            label: 'XGBoost',
            data: [0.863, 0.854, 0.863, 0.853],
            backgroundColor: `${colors.amber}30`,
            borderColor: colors.amber,
            borderWidth: 2,
            pointBackgroundColor: colors.amber,
            pointBorderColor: colors.text,
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
          {
            label: 'Random Forest',
            data: [0.864, 0.857, 0.864, 0.858],
            backgroundColor: `${colors.green}30`,
            borderColor: colors.green,
            borderWidth: 2,
            pointBackgroundColor: colors.green,
            pointBorderColor: colors.text,
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 1,
            ticks: {
              color: colors.text,
            },
            grid: {
              color: colors.border,
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: colors.text,
              font: {
                size: 12,
              },
            },
          },
        },
      },
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }

  private createClassificationReportChart() {
    const ctx = this.classificationReportChart.nativeElement.getContext('2d');
    if (!ctx) return;

    const colors = this.getThemeColors();

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: ['Class 0 - Low\nUtilization', 'Class 1 - High\nUtilization'],
        datasets: [
          {
            label: 'Sample Distribution',
            data: [647, 2353],
            backgroundColor: [colors.primary, colors.green],
            borderColor: colors.text,
            borderWidth: 2,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: colors.text,
              font: {
                size: 12,
              },
              padding: 15,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const total = (context.dataset.data as number[]).reduce(
                  (a: number, b: number) => a + b,
                  0,
                );
                const percentage = (
                  ((context.parsed as number) / (total as number)) *
                  100
                ).toFixed(1);
                return `${context.label}: ${context.parsed} (${percentage}%)`;
              },
            },
          },
        },
      },
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }
}
