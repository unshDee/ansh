import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectTemplateComponent } from '../../shared/project-template/project-template.component';
import { WindowComponent } from '../../../../shared/components/window/window.component';
import { SafeLatexPipe } from '../../../../shared/pipes';
import { AnalyticsService } from '../../../../core/services/analytics.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'app-program-repair-hint',
  imports: [
    CommonModule,
    ProjectTemplateComponent,
    WindowComponent,
    SafeLatexPipe,
  ],
  templateUrl: './program-repair-hint.component.html',
  styleUrl: './program-repair-hint.component.css',
})
export class ProgramRepairHintComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('loraChart', { static: false })
  loraChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('loraResourceChart', { static: false })
  loraResourceChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('samplingChart', { static: false })
  samplingChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('baselineChart', { static: false })
  baselineChart!: ElementRef<HTMLCanvasElement>;

  private charts: Chart[] = [];
  showDetailedView = false;

  constructor(
    private analyticsService: AnalyticsService,
    private themeService: ThemeService,
  ) {
    Chart.register(...registerables);    // React to theme changes
    effect(() => {
      const currentTheme = this.themeService.theme();
      // Add a small delay to ensure charts are created
      setTimeout(() => {
        this.updateChartsForTheme(currentTheme);
      }, 100);
    });
  }
  ngOnInit() {
    // Track project page view
    this.analyticsService.trackProjectView(
      'Program Repair and Hint Generation',
    );
    this.analyticsService.trackEvent('page_view', {
      page_title: 'Program Repair and Hint Generation',
      page_location: '/projects/program-repair-hint',
      project_category: 'generative-ai',
    });
  }
  ngAfterViewInit() {
    this.createBaselineChart();
    this.createSamplingChart();
    this.createLoRAChart();
    this.createLoRAResourceChart();
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
    };
  }
  private updateChartsForTheme(theme: string) {
    if (this.charts.length === 0) return;

    const colors = this.getThemeColors();

    this.charts.forEach((chart, index) => {
      // Update text colors
      if (chart.options.plugins?.title) {
        chart.options.plugins.title.color = colors.text;
      }
      if (chart.options.plugins?.legend?.labels) {
        chart.options.plugins.legend.labels.color = colors.text;
      }

      // Update scale colors with proper type checking
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
      }      // Update dataset colors based on chart type
      chart.data.datasets.forEach((dataset: any, datasetIndex) => {
        if (index === 0) {
          // Baseline Chart - bars with text border and themed background
          dataset.backgroundColor = [colors.green, colors.primary];
          dataset.borderColor = [colors.text, colors.text];
        } else if (index === 1) {
          // Sampling Chart - text color line, progression from red to green
          dataset.borderColor = colors.text;
          dataset.backgroundColor = `${colors.text}1A`;
          dataset.pointBackgroundColor = [
            colors.primary,  // k=1 (lowest) - red
            colors.orange,   // k=5 - orange
            colors.yellow,   // k=10 - yellow
            colors.green,    // k=20 (highest) - green
          ];
          dataset.pointBorderColor = [
            colors.primary,
            colors.orange,
            colors.yellow,
            colors.green,
          ];
        } else if (index === 2) {
          // LoRA Performance Chart - bars with text border and themed background
          dataset.backgroundColor = [
            colors.primary,
            colors.amber,
            colors.green,
          ];
          dataset.borderColor = [colors.text, colors.text, colors.text];
        } else if (index === 3) {
          // LoRA Resource Chart
          if (datasetIndex === 0) {
            // Parameters line - text color line, red point (lowest value)
            dataset.borderColor = colors.text;
            dataset.pointBackgroundColor = colors.primary;
          } else if (datasetIndex === 1) {
            // Memory line - text color line, green point (highest value)
            dataset.borderColor = colors.text;
            dataset.pointBackgroundColor = colors.green;
          }
        }
      });

      chart.update('none');
    });
  }
  private createLoRAChart() {
    const ctx = this.loraChart.nativeElement.getContext('2d');
    if (!ctx) return;

    const colors = this.getThemeColors();

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: [
          'Low Rank\n(r=4, α=8)',
          'Medium Rank\n(r=16, α=32)',
          'High Rank\n(r=64, α=128)',
        ],        datasets: [
          {
            label: 'RPass Rate (%)',
            data: [64, 80, 88],
            backgroundColor: [colors.primary, colors.amber, colors.green],
            borderColor: [colors.text, colors.text, colors.text],
            borderWidth: 1,
            hoverBorderWidth: 1, // Same as borderWidth to prevent scaling
            hoverBackgroundColor: [colors.primary, colors.amber, colors.green], // Same as backgroundColor
            hoverBorderColor: [colors.text, colors.text, colors.text], // Same as borderColor
            barThickness: 50,
            borderRadius: 0,
            borderSkipped: false,
          },
        ],
      },      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          bar: {
            borderRadius: 0,
            hoverBorderWidth: 1, // Prevent border width changes on hover
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'LoRA Configuration: Performance Comparison',
            font: {
              family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              size: 16,
              weight: 'bold',
            },
            color: colors.text,
          },
          legend: {
            display: false, // Single dataset, no need for legend
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              },
              color: colors.text,
            },
            grid: {
              color: colors.border,
            },
          },
          y: {
            title: {
              display: true,
              text: 'RPass Rate (%)',
              font: {
                family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              },
              color: colors.text,
            },
            ticks: {
              font: {
                family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              },
              color: colors.text,
            },
            grid: {
              color: colors.border,
            },
            min: 0,
            max: 100,
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        onHover: (event, elements) => {
          if (elements.length > 0) {
            this.analyticsService.trackEvent('chart_interaction', {
              event_category: 'engagement',
              event_label: 'lora_chart_hover',
              chart_type: 'lora_performance',
            });
          }
        },
      },
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }
  private createLoRAResourceChart() {
    const ctx = this.loraResourceChart.nativeElement.getContext('2d');
    if (!ctx) return;

    const colors = this.getThemeColors();

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: [
          'Low Rank\n(r=4, α=8)',
          'Medium Rank\n(r=16, α=32)',
          'High Rank\n(r=64, α=128)',
        ],        datasets: [
          {
            label: 'Parameters (M)',
            data: [7.4, 29.8, 119.5],
            backgroundColor: 'transparent',
            borderColor: colors.text,
            borderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 6, // Same as pointRadius to prevent scaling
            pointBorderWidth: 0,
            pointBackgroundColor: colors.primary, // Red for lowest values
            yAxisID: 'y',
          },
          {
            label: 'Memory Usage (GB)',
            data: [0.817, 1.022, 1.625],
            backgroundColor: 'transparent',
            borderColor: colors.text,
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 6,
                        pointHoverRadius: 6, // Same as pointRadius to prevent scaling
            pointBorderWidth: 0,
            pointBackgroundColor: colors.green, // Green for highest values
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,        elements: {
          point: {
            radius: 6,
            hoverRadius: 6, // Same as radius to prevent scaling on hover
            borderWidth: 0,
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'LoRA Configuration: Resource Usage',
            font: {
              family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              size: 16,
              weight: 'bold',
            },
            color: colors.text,
          },
          legend: {
            labels: {
              font: {
                family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              },
              color: colors.text,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              },
              color: colors.text,
            },
            grid: {
              color: colors.border,
            },
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Parameters (M)',
              font: {
                family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              },
              color: colors.text,
            },
            ticks: {
              font: {
                family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              },
              color: colors.text,
            },
            grid: {
              color: colors.border,
            },
            min: 0,
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Memory Usage (GB)',
              font: {
                family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              },
              color: colors.text,
            },
            ticks: {
              font: {
                family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              },
              color: colors.text,
            },
            grid: {
              drawOnChartArea: false,
            },
            min: 0,
            max: 2,
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        onHover: (event, elements) => {
          if (elements.length > 0) {
            this.analyticsService.trackEvent('chart_interaction', {
              event_category: 'engagement',
              event_label: 'lora_resource_chart_hover',
              chart_type: 'lora_resource_usage',
            });
          }
        },
      },
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }
  private createSamplingChart() {
    const ctx = this.samplingChart.nativeElement.getContext('2d');
    if (!ctx) return;

    const colors = this.getThemeColors();

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['k=1', 'k=5', 'k=10', 'k=20'],        datasets: [
          {
            label: 'RPass Rate (%)',
            data: [36, 52, 58, 62],
            borderColor: colors.text,
            backgroundColor: `${colors.text}1A`, // Add transparency
            borderWidth: 2,
            pointBackgroundColor: [
              colors.primary,
              colors.orange,
              colors.yellow,
              colors.green,
            ],
            pointBorderColor: [
              colors.primary,
              colors.orange,
              colors.yellow,
              colors.green,
            ],
            pointRadius: 6,
            pointHoverRadius: 6, // Same as pointRadius to prevent scaling
            pointBorderWidth: 0,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,        elements: {
          point: {
            radius: 6,
            hoverRadius: 6, // Same as radius to prevent scaling on hover
            borderWidth: 0,
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Multi-Candidate Sampling Performance',
            font: {
              family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              size: 16,
              weight: 'bold',
            },
            color: colors.text,
          },
          legend: {
            labels: {
              font: {
                family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              },
              color: colors.text,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Number of Candidates',
              font: {
                family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              },
              color: colors.text,
            },
            ticks: {
              font: {
                family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              },
              color: colors.text,
            },
            grid: {
              color: colors.border,
            },
          },
          y: {
            title: {
              display: true,
              text: 'RPass Rate (%)',
              font: {
                family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              },
              color: colors.text,
            },
            ticks: {
              font: {
                family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              },
              color: colors.text,
            },
            grid: {
              color: colors.border,
            },
            min: 30,
            max: 70,
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        onHover: (event, elements) => {
          if (elements.length > 0) {
            this.analyticsService.trackEvent('chart_interaction', {
              event_category: 'engagement',
              event_label: 'sampling_chart_hover',
              chart_type: 'multi_candidate_sampling',
            });
          }
        },
      },
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }
  private createBaselineChart() {
    const ctx = this.baselineChart.nativeElement.getContext('2d');
    if (!ctx) return;

    const colors = this.getThemeColors();

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['GPT-4o-mini', 'Phi-3-mini'],        datasets: [
          {
            label: 'RPass Rate (%)',
            data: [92, 36],
            backgroundColor: [colors.green, colors.primary],
            borderColor: [colors.text, colors.text],
            borderWidth: 1,
            hoverBorderWidth: 1, // Same as borderWidth to prevent scaling
            hoverBackgroundColor: [colors.green, colors.primary], // Same as backgroundColor
            hoverBorderColor: [colors.text, colors.text], // Same as borderColor
            barThickness: 60,
            borderRadius: 0,
            borderSkipped: false,
          },
        ],
      },
      options: {
        indexAxis: 'y' as const, // This makes it horizontal
        responsive: true,
        maintainAspectRatio: false,        elements: {
          bar: {
            borderRadius: 0,
            hoverBorderWidth: 1, // Prevent border width changes on hover
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Baseline Model Performance Comparison',
            font: {
              family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              size: 16,
              weight: 'bold',
            },
            color: colors.text,
          },
          legend: {
            display: false, // Hide legend since it's redundant with labels
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `${context.label}: ${context.parsed.x}% RPass Rate`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'RPass Rate (%)',
              font: {
                family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              },
              color: colors.text,
            },
            ticks: {
              font: {
                family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              },
              color: colors.text,
            },
            grid: {
              color: colors.border,
            },
            min: 0,
            max: 100,
          },
          y: {
            ticks: {
              font: {
                family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                size: 14,
              },
              color: colors.text,
            },
            grid: {
              display: false,
            },
          },
        },
        onHover: (event, elements) => {
          if (elements.length > 0) {
            this.analyticsService.trackEvent('chart_interaction', {
              event_category: 'engagement',
              event_label: 'baseline_chart_hover',
              chart_type: 'baseline_performance',
            });
          }
        },
      },
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }

  trackDemoClick() {
    this.analyticsService.trackEvent('demo_click', {
      event_category: 'engagement',
      event_label: 'program-repair-demo',
      project_name: 'Program Repair and Hint Generation',
    });
  }
  trackGitHubClick() {
    this.analyticsService.trackOutboundLink('#', 'Program Repair GitHub');
  }

  toggleDetailedView() {
    this.showDetailedView = !this.showDetailedView;
    this.analyticsService.trackEvent('view_toggle', {
      event_category: 'engagement',
      event_label: 'detailed_view_toggle',
      view_state: this.showDetailedView ? 'detailed' : 'summary',
    });
  }

  ngOnDestroy() {
    // Clean up charts to prevent memory leaks
    this.charts.forEach((chart) => chart.destroy());
  }
}
