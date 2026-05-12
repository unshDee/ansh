import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  effect,
} from '@angular/core';
import { ProjectTemplateComponent } from '../../shared/project-template/project-template.component';
import { WindowComponent } from '../../../../shared/components/window/window.component';
import { SafeLatexPipe } from '../../../../shared/pipes';
import { AnalyticsService } from '../../../../core/services/analytics.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'app-llm-sampling-bias',
  imports: [ProjectTemplateComponent, WindowComponent, SafeLatexPipe],
  templateUrl: './llm-sampling-bias.component.html',
  styleUrl: './llm-sampling-bias.component.css',
})
export class LlmSamplingBiasComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('alphaChart', { static: false })
  alphaChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('crosslingualChart', { static: false })
  crosslingualChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('personaMedChart', { static: false })
  personaMedChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('personaFinChart', { static: false })
  personaFinChart!: ElementRef<HTMLCanvasElement>;

  private charts: Chart[] = [];

  readonly tier1Data = [
    { label: 'Sleep hours/night', alpha_hat: 1.0, positive: true },
    { label: 'TV hours/day', alpha_hat: -0.233, positive: false },
    { label: 'Exercise hours/week', alpha_hat: 0.002, positive: true },
    { label: 'Sugary drinks/week', alpha_hat: 0.873, positive: true },
    { label: 'Social media min/day', alpha_hat: -14.523, positive: false },
    { label: 'Coffee cups/day', alpha_hat: -0.818, positive: false },
    { label: 'Books read/year', alpha_hat: 0.258, positive: true },
    { label: 'Calories/day', alpha_hat: 1.0, positive: true },
    { label: 'Parent calls/month', alpha_hat: -4.333, positive: false },
    { label: 'Customer service wait (min)', alpha_hat: 0.617, positive: true },
    { label: 'Adults who smoke (%)', alpha_hat: 10.0, positive: true },
    { label: 'Phone checks/day', alpha_hat: -0.537, positive: false },
    { label: 'Home cleaning/month', alpha_hat: -4.25, positive: false },
    { label: 'Laundry loads/week', alpha_hat: 1.667, positive: true },
    { label: 'Desserts/week', alpha_hat: 0.243, positive: true },
    { label: 'Parking tickets/year', alpha_hat: -0.091, positive: false },
    { label: 'Drunk driving (%)', alpha_hat: 0.0, positive: false },
    { label: 'Snooze hits/day', alpha_hat: 0.853, positive: true },
    { label: 'Texts sent/day', alpha_hat: 1.01, positive: true },
    { label: 'Honking/week', alpha_hat: -1.667, positive: false },
    { label: 'HS dropout (%)', alpha_hat: 0.409, positive: true },
    { label: 'Exam cheating (%)', alpha_hat: 1.0, positive: true },
    { label: 'Temper losses/week', alpha_hat: -0.2, positive: false },
    { label: 'Fruits & veg/month', alpha_hat: -0.258, positive: false },
    { label: 'Miles walked/week', alpha_hat: -0.118, positive: false },
  ];

  readonly tier3Data = [
    { label: 'Sleep hours/night', en: 2.0, de: -5.0, flip: true },
    { label: 'TV hours/day', en: 0.057, de: -0.136, flip: true },
    { label: 'Exercise hours/week', en: -0.007, de: -0.143, flip: false },
    { label: 'Sugary drinks/week', en: 1.0, de: 0.914, flip: false },
    { label: 'Social media min/day', en: -2.366, de: -1.012, flip: false },
    { label: 'Coffee cups/day', en: -3.0, de: -0.5, flip: false },
    { label: 'Books read/year', en: 0.387, de: 0.524, flip: false },
    { label: 'Calories/day', en: 2.333, de: 1.458, flip: false },
    { label: 'Parent calls/month', en: 0.623, de: 2.818, flip: false },
    { label: 'Customer service wait', en: 0.923, de: -1.167, flip: true },
    { label: 'Adults who smoke (%)', en: -0.681, de: 0.653, flip: true },
    { label: 'Phone checks/day', en: 0.139, de: -2.341, flip: true },
    { label: 'Home cleaning/month', en: -0.351, de: 1.9, flip: true },
    { label: 'Laundry loads/week', en: -0.157, de: 0.667, flip: true },
    { label: 'Desserts/week', en: 0.314, de: -0.0, flip: true },
  ];

  readonly tier4MedData = [
    { label: 'Cold/flu recovery', ha: 0.67, stat: 2.26, clin: -1.75 },
    { label: 'Back pain recovery', ha: 0.12, stat: -0.08, clin: 0.61 },
    { label: 'Pneumonia recovery', ha: 1.5, stat: 0.33, clin: 0.28 },
    { label: 'Ankle sprain recovery', ha: -5.57, stat: 4.67, clin: 0.18 },
    { label: 'Concussion recovery', ha: 0.02, stat: 0.94, clin: 1.43 },
    { label: 'Broken arm recovery', ha: -0.35, stat: -0.11, clin: 2.06 },
    { label: 'Knee surgery recovery', ha: 4.75, stat: 3.73, clin: 0.64 },
    { label: 'Appendectomy recovery', ha: 12.0, stat: -0.86, clin: 0.3 },
  ];

  readonly tier4FinData = [
    { label: 'Monthly savings rate', ha: -0.65, stat: -3.39, fa: -0.48 },
    { label: 'Emergency fund size', ha: -1.0, stat: 3.0, fa: 0.92 },
    { label: 'Retirement contribution', ha: -0.25, stat: -0.11, fa: -0.25 },
    { label: 'Stock allocation', ha: -0.95, stat: 56.0, fa: 0.53 },
    { label: 'Housing cost ratio', ha: 0.33, stat: 0.0, fa: -0.33 },
    { label: 'Debt-to-income ratio', ha: 2.43, stat: 4.84, fa: -0.61 },
    { label: 'Expected return (%)', ha: 29.0, stat: 0.0, fa: -1.87 },
    { label: 'Monthly credit card debt', ha: 0.0, stat: 1.0, fa: 1.0 },
  ];

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
    this.analyticsService.trackProjectView('LLM Sampling Bias');
    this.analyticsService.trackEvent('page_view', {
      page_title: 'Prescriptive Bias in LLM Sampling',
      page_location: '/projects/llm-sampling-bias',
      project_category: 'ai-research',
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createAlphaChart();
      this.createCrosslingualChart();
      this.createPersonaMedChart();
      this.createPersonaFinChart();
    }, 0);
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
      green: isDark ? '#4ade80' : '#15803d',
      blue: isDark ? '#60a5fa' : '#2563eb',
      amber: isDark ? '#fbbf24' : '#d97706',
      orange: isDark ? '#fb923c' : '#ea580c',
    };
  }

  private updateChartsForTheme(_theme: string) {
    if (this.charts.length === 0) return;
    const colors = this.getThemeColors();

    this.charts.forEach((chart, index) => {
      if (chart.options.plugins?.legend?.labels) {
        chart.options.plugins.legend.labels.color = colors.text;
      }
      if (chart.options.scales) {
        Object.values(chart.options.scales).forEach((scale: any) => {
          if (!scale) return;
          if (scale.ticks) scale.ticks.color = colors.text;
          if (scale.title) scale.title.color = colors.text;
          if (scale.grid) scale.grid.color = colors.border;
        });
      }

      chart.data.datasets.forEach((dataset: any, di) => {
        if (index === 0) {
          dataset.backgroundColor = this.tier1Data.map((d) =>
            d.positive ? colors.green : colors.primary,
          );
        } else if (index === 1) {
          if (di === 0) dataset.backgroundColor = colors.blue;
          if (di === 1) dataset.backgroundColor = colors.amber;
        } else if (index === 2) {
          if (di === 0) dataset.backgroundColor = colors.blue;
          if (di === 1) dataset.backgroundColor = colors.amber;
          if (di === 2) dataset.backgroundColor = colors.green;
        } else if (index === 3) {
          if (di === 0) dataset.backgroundColor = colors.blue;
          if (di === 1) dataset.backgroundColor = colors.amber;
          if (di === 2) dataset.backgroundColor = colors.orange;
        }
      });

      chart.update('none');
    });
  }

  private createAlphaChart() {
    const ctx = this.alphaChart.nativeElement.getContext('2d');
    if (!ctx) return;
    const colors = this.getThemeColors();

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.tier1Data.map((d) => d.label),
        datasets: [
          {
            label: 'α̂ (normalized prescriptive pull)',
            data: this.tier1Data.map((d) => d.alpha_hat),
            backgroundColor: this.tier1Data.map((d) =>
              d.positive ? colors.green : colors.primary,
            ),
            borderWidth: 0,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` α̂ = ${(ctx.raw as number).toFixed(3)}`,
            },
          },
        },
        scales: {
          x: {
            ticks: { color: colors.text },
            grid: { color: colors.border },
            title: {
              display: true,
              text: 'α̂ (normalized)',
              color: colors.text,
            },
          },
          y: {
            ticks: { color: colors.text, font: { size: 11 } },
            grid: { color: colors.border },
          },
        },
      },
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }

  private createCrosslingualChart() {
    const ctx = this.crosslingualChart.nativeElement.getContext('2d');
    if (!ctx) return;
    const colors = this.getThemeColors();

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.tier3Data.map((d) => d.label),
        datasets: [
          {
            label: 'English (EN)',
            data: this.tier3Data.map((d) => d.en),
            backgroundColor: colors.blue,
            borderWidth: 0,
          },
          {
            label: 'German (DE)',
            data: this.tier3Data.map((d) => d.de),
            backgroundColor: colors.amber,
            borderWidth: 0,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: { color: colors.text },
          },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                ` ${ctx.dataset.label}: α̂ = ${(ctx.raw as number).toFixed(3)}`,
            },
          },
        },
        scales: {
          x: {
            ticks: { color: colors.text },
            grid: { color: colors.border },
            title: {
              display: true,
              text: 'α̂ (normalized)',
              color: colors.text,
            },
          },
          y: {
            ticks: { color: colors.text, font: { size: 11 } },
            grid: { color: colors.border },
          },
        },
      },
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }

  private createPersonaMedChart() {
    const ctx = this.personaMedChart.nativeElement.getContext('2d');
    if (!ctx) return;
    const colors = this.getThemeColors();

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.tier4MedData.map((d) => d.label),
        datasets: [
          {
            label: 'Helpful Assistant',
            data: this.tier4MedData.map((d) => d.ha),
            backgroundColor: colors.blue,
            borderWidth: 0,
          },
          {
            label: 'Statistician',
            data: this.tier4MedData.map((d) => d.stat),
            backgroundColor: colors.amber,
            borderWidth: 0,
          },
          {
            label: 'Clinician',
            data: this.tier4MedData.map((d) => d.clin),
            backgroundColor: colors.green,
            borderWidth: 0,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: { color: colors.text },
          },
        },
        scales: {
          x: {
            ticks: { color: colors.text },
            grid: { color: colors.border },
            title: {
              display: true,
              text: 'α̂ (normalized)',
              color: colors.text,
            },
          },
          y: {
            ticks: { color: colors.text, font: { size: 11 } },
            grid: { color: colors.border },
          },
        },
      },
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }

  private createPersonaFinChart() {
    const ctx = this.personaFinChart.nativeElement.getContext('2d');
    if (!ctx) return;
    const colors = this.getThemeColors();

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.tier4FinData.map((d) => d.label),
        datasets: [
          {
            label: 'Helpful Assistant',
            data: this.tier4FinData.map((d) => d.ha),
            backgroundColor: colors.blue,
            borderWidth: 0,
          },
          {
            label: 'Statistician',
            data: this.tier4FinData.map((d) => d.stat),
            backgroundColor: colors.amber,
            borderWidth: 0,
          },
          {
            label: 'Financial Analyst',
            data: this.tier4FinData.map((d) => d.fa),
            backgroundColor: colors.orange,
            borderWidth: 0,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: { color: colors.text },
          },
        },
        scales: {
          x: {
            ticks: { color: colors.text },
            grid: { color: colors.border },
            title: {
              display: true,
              text: 'α̂ (normalized)',
              color: colors.text,
            },
          },
          y: {
            ticks: { color: colors.text, font: { size: 11 } },
            grid: { color: colors.border },
          },
        },
      },
    };

    const chart = new Chart(ctx, config);
    this.charts.push(chart);
  }
}
