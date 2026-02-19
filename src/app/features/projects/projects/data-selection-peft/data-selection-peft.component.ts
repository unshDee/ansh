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
import { SafeHtmlPipe, SafeLatexPipe } from '../../../../shared/pipes';
import { AnalyticsService } from '../../../../core/services/analytics.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'app-data-selection-peft',
  imports: [
    ProjectTemplateComponent,
    WindowComponent,
    SafeHtmlPipe,
    SafeLatexPipe,
  ],
  templateUrl: './data-selection-peft.component.html',
  styleUrl: './data-selection-peft.component.css',
})
export class DataSelectionPeftComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('finetuningChart', { static: false })
  finetuningChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('selectionChart', { static: false })
  selectionChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('paramChart', { static: false })
  paramChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('combinedChart', { static: false })
  combinedChart!: ElementRef<HTMLCanvasElement>;

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
    this.analyticsService.trackProjectView('Data Selection and PEFT');
    this.analyticsService.trackEvent('page_view', {
      page_title: 'Data Selection and PEFT',
      page_location: '/projects/data-selection-peft',
      project_category: 'machine-learning',
    });
  }

  ngAfterViewInit() {
    this.createFinetuningChart();
    this.createSelectionChart();
    this.createParamChart();
    this.createCombinedChart();
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
          if (scale.ticks)       scale.ticks.color       = colors.text;
          if (scale.title)       scale.title.color       = colors.text;
          if (scale.grid)        scale.grid.color        = colors.border;
          if (scale.angleLines)  scale.angleLines.color  = colors.border;
          if (scale.pointLabels) scale.pointLabels.color = colors.text;
        });
      }

      chart.data.datasets.forEach((dataset: any, di) => {
        if (index === 0) {
          // Fine-tuning bar — per-bar: secondary → amber → green (improving)
          dataset.backgroundColor = [colors.primary, colors.amber, colors.green];
          dataset.borderColor     = [colors.primary, colors.amber, colors.green];
        } else if (index === 1) {
          // Data selection horizontal bar — red→orange→amber→yellow→green gradient (worst→best)
          dataset.backgroundColor = [colors.primary, colors.orange, colors.amber, colors.yellow, colors.green];
          dataset.borderColor     = [colors.primary, colors.orange, colors.amber, colors.yellow, colors.green];
        } else if (index === 2) {
          // Radar — primary / amber / green per PEFT
          if (di === 0) { dataset.borderColor = colors.primary; dataset.backgroundColor = `${colors.primary}30`; dataset.pointBackgroundColor = colors.primary; }
          if (di === 1) { dataset.borderColor = colors.amber;   dataset.backgroundColor = `${colors.amber}30`;   dataset.pointBackgroundColor = colors.amber;   }
          if (di === 2) { dataset.borderColor = colors.green;   dataset.backgroundColor = `${colors.green}30`;   dataset.pointBackgroundColor = colors.green;   }
        } else if (index === 3) {
          // Combined line — primary / amber / green per PEFT
          if (di === 0) { dataset.borderColor = colors.primary; dataset.backgroundColor = `${colors.primary}15`; dataset.pointBackgroundColor = colors.primary; }
          if (di === 1) { dataset.borderColor = colors.amber;   dataset.backgroundColor = `${colors.amber}15`;   dataset.pointBackgroundColor = colors.amber;   }
          if (di === 2) { dataset.borderColor = colors.green;   dataset.backgroundColor = `${colors.green}15`;   dataset.pointBackgroundColor = colors.green;   }
        }
      });

      chart.update('none');
    });
  }

  private createFinetuningChart() {
    const ctx = this.finetuningChart.nativeElement.getContext('2d');
    if (!ctx) return;
    const colors = this.getThemeColors();

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Pre-trained', 'Supervised Only', 'Unsupervised + Supervised'],
        datasets: [
          {
            label: 'Test MSE',
            data: [1.15, 0.538, 0.532],
            backgroundColor: [colors.primary, colors.amber, colors.green],
            borderColor:     [colors.primary, colors.amber, colors.green],
            borderWidth: 0,
            borderRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` MSE: ${(ctx.parsed.y ?? 0).toFixed(3)}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 1.3,
            ticks: { color: colors.text },
            grid:  { color: colors.border },
            title: { display: true, text: 'Test MSE', color: colors.text, font: { size: 12 } },
          },
          x: {
            ticks: { color: colors.text },
            grid:  { display: false },
          },
        },
      },
    };

    this.charts.push(new Chart(ctx, config));
  }

  private createSelectionChart() {
    const ctx = this.selectionChart.nativeElement.getContext('2d');
    if (!ctx) return;
    const colors = this.getThemeColors();

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: [
          'Random (185)',
          'Diversity (185)',
          'Active Learning (183)',
          'Full External (300)',
          'Influence (185)',
        ],
        datasets: [
          {
            label: 'Test MSE',
            data: [0.576, 0.563, 0.548, 0.530, 0.510],
            backgroundColor: [colors.primary, colors.orange, colors.amber, colors.yellow, colors.green],
            borderColor:     [colors.primary, colors.orange, colors.amber, colors.yellow, colors.green],
            borderWidth: 0,
            borderRadius: 4,
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
              label: (ctx) => ` MSE: ${(ctx.parsed.x ?? 0).toFixed(3)}`,
            },
          },
        },
        scales: {
          x: {
            beginAtZero: false,
            min: 0.48,
            max: 0.62,
            ticks: { color: colors.text },
            grid:  { color: colors.border },
            title: { display: true, text: 'Test MSE', color: colors.text, font: { size: 12 } },
          },
          y: {
            ticks: { color: colors.text, font: { size: 11 } },
            grid:  { display: false },
          },
        },
      },
    };

    this.charts.push(new Chart(ctx, config));
  }

  private createParamChart() {
    const ctx = this.paramChart.nativeElement.getContext('2d');
    if (!ctx) return;
    const colors = this.getThemeColors();

    // Radar — normalised 0–10 scores per PEFT across three axes:
    //   Param Efficiency (lower % trainable = higher score):
    //     BitFit 0.17% → 9.4,  LoRA 37.4% → 0,  (IA)³ 0.06% → 10
    //   Predictive Performance (lower best-MSE = higher score):
    //     BitFit 0.477 → 2.4,  LoRA 0.083 → 10,  (IA)³ 0.522 → 1.5
    //   Implementation Simplicity (subjective, fewer hyperparams = higher):
    //     BitFit → 10,  LoRA → 5,  (IA)³ → 8
    const config: ChartConfiguration = {
      type: 'radar',
      data: {
        labels: ['Parameter\nEfficiency', 'Predictive\nPerformance', 'Implementation\nSimplicity'],
        datasets: [
          {
            label: 'BitFit',
            data: [9.4, 2.4, 10],
            borderColor: colors.primary,
            backgroundColor: `${colors.primary}30`,
            pointBackgroundColor: colors.primary,
            pointBorderColor: colors.text,
            borderWidth: 2,
            pointRadius: 4,
          },
          {
            label: 'LoRA',
            data: [0, 10, 5],
            borderColor: colors.amber,
            backgroundColor: `${colors.amber}30`,
            pointBackgroundColor: colors.amber,
            pointBorderColor: colors.text,
            borderWidth: 2,
            pointRadius: 4,
          },
          {
            label: '(IA)³',
            data: [10, 1.5, 8],
            borderColor: colors.green,
            backgroundColor: `${colors.green}30`,
            pointBackgroundColor: colors.green,
            pointBorderColor: colors.text,
            borderWidth: 2,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: { color: colors.text, font: { size: 12 }, boxWidth: 12, padding: 16, usePointStyle: true },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${(ctx.raw as number).toFixed(1)} / 10`,
            },
          },
        },
        scales: {
          r: {
            min: 0,
            max: 10,
            ticks: { display: false, stepSize: 2 },
            grid:        { color: colors.border },
            angleLines:  { color: colors.border },
            pointLabels: { color: colors.text, font: { size: 11 } },
          },
        },
      },
    };

    this.charts.push(new Chart(ctx, config));
  }

  private createCombinedChart() {
    const ctx = this.combinedChart.nativeElement.getContext('2d');
    if (!ctx) return;
    const colors = this.getThemeColors();

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['Full External', 'Random', 'Active Learning', 'Diversity', 'Influence'],
        datasets: [
          {
            label: 'BitFit',
            data: [0.534, 0.477, 0.487, 0.488, 0.497],
            borderColor: colors.primary,
            backgroundColor: `${colors.primary}15`,
            pointBackgroundColor: colors.primary,
            pointBorderColor: colors.text,
            pointRadius: 5,
            pointHoverRadius: 7,
            borderWidth: 2.5,
            tension: 0.3,
            fill: false,
          },
          {
            label: 'LoRA',
            data: [0.102, 0.083, 0.088, 0.095, 0.093],
            borderColor: colors.amber,
            backgroundColor: `${colors.amber}15`,
            pointBackgroundColor: colors.amber,
            pointBorderColor: colors.text,
            pointRadius: 5,
            pointHoverRadius: 7,
            borderWidth: 2.5,
            tension: 0.3,
            fill: false,
          },
          {
            label: '(IA)³',
            data: [0.524, 0.522, 0.533, 0.526, 0.547],
            borderColor: colors.green,
            backgroundColor: `${colors.green}15`,
            pointBackgroundColor: colors.green,
            pointBorderColor: colors.text,
            pointRadius: 5,
            pointHoverRadius: 7,
            borderWidth: 2.5,
            tension: 0.3,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            display: true,
            labels: { color: colors.text, font: { size: 12 }, boxWidth: 12, padding: 16, usePointStyle: true },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${(ctx.parsed.y ?? 0).toFixed(3)} MSE`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 0.05,
            max: 0.6,
            ticks: { color: colors.text },
            grid:  { color: colors.border },
            title: { display: true, text: 'Test MSE', color: colors.text, font: { size: 12 } },
          },
          x: {
            ticks: { color: colors.text, font: { size: 11 } },
            grid:  { color: colors.border },
          },
        },
      },
    };

    this.charts.push(new Chart(ctx, config));
  }

  // ── PEFT architecture diagrams ──────────────────────────────────────────
  bitfitSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 222' width='300px' height='222px'>
  <!-- Predictions label -->
  <text x='150' y='14' text-anchor='middle' font-size='12' font-family='sans-serif' fill='currentColor'>Predictions</text>
  <!-- Arrow: regression head top → predictions -->
  <line x1='150' y1='36' x2='150' y2='22' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='144,22 156,22 150,15' fill='currentColor'/>
  <!-- Regression Head outer box (primary border = trainable) -->
  <rect x='58' y='36' width='184' height='80' rx='0' fill='none' stroke='var(--color-primary)' stroke-width='1.5'/>
  <!-- Rotated side label -->
  <text x='46' y='76' text-anchor='middle' font-size='8' font-family='sans-serif' fill='currentColor' transform='rotate(-90,46,76)'>Regression Head</text>
  <!-- Linear Layer inner box -->
  <rect x='70' y='44' width='160' height='26' rx='0' fill='none' stroke='currentColor' stroke-width='1.2'/>
  <text x='150' y='61' text-anchor='middle' font-size='11' font-family='sans-serif' fill='currentColor'>Linear Layer</text>
  <!-- Dropout inner box -->
  <rect x='70' y='80' width='160' height='26' rx='0' fill='none' stroke='currentColor' stroke-width='1.2'/>
  <text x='150' y='97' text-anchor='middle' font-size='11' font-family='sans-serif' fill='currentColor'>Dropout</text>
  <!-- Arrow: pretrained top → regression head bottom -->
  <line x1='150' y1='130' x2='150' y2='120' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='144,120 156,120 150,116' fill='currentColor'/>
  <!-- Pretrained Model box (currentColor = frozen) -->
  <rect x='40' y='130' width='220' height='56' rx='0' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='150' y='151' text-anchor='middle' font-size='11' font-family='sans-serif' fill='currentColor'>Pretrained Model</text>
  <!-- Trainable bias dots in primary colour -->
  <circle cx='118' cy='164' r='3.5' fill='var(--color-primary)'/>
  <circle cx='132' cy='164' r='3.5' fill='var(--color-primary)'/>
  <circle cx='146' cy='164' r='3.5' fill='var(--color-primary)'/>
  <circle cx='160' cy='164' r='3.5' fill='var(--color-primary)'/>
  <circle cx='174' cy='164' r='3.5' fill='var(--color-primary)'/>
  <text x='150' y='177' text-anchor='middle' font-size='8.5' font-family='sans-serif' font-style='italic' fill='currentColor'>only bias b terms trainable</text>
  <!-- Arrow: SMILES → pretrained -->
  <line x1='150' y1='210' x2='150' y2='192' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='144,192 156,192 150,186' fill='currentColor'/>
  <!-- SMILES label -->
  <text x='150' y='220' text-anchor='middle' font-size='12' font-family='sans-serif' fill='currentColor'>SMILES</text>
</svg>`;

  loraSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 232' width='300px' height='232px'>
  <!-- h label -->
  <text x='150' y='12' text-anchor='middle' font-size='13' font-family='sans-serif' font-style='italic' fill='currentColor'>h</text>
  <!-- h green bar -->
  <rect x='15' y='16' width='270' height='13' rx='0' stroke='var(--color-green)' stroke-width='1.5' fill='none'/>
  <!-- Arrows: frozen W top and LoRA B top → h bar -->
  <line x1='57' y1='42' x2='57' y2='30' stroke='currentColor' stroke-width='2'/>
  <polygon points='51,30 63,30 57,24' fill='currentColor'/>
  <line x1='200' y1='42' x2='200' y2='30' stroke='currentColor' stroke-width='2'/>
  <polygon points='194,30 206,30 200,24' fill='currentColor'/>
  <!-- + merge symbol -->
  <text x='128' y='38' text-anchor='middle' font-size='17' font-family='sans-serif' fill='currentColor'>+</text>
  <!-- Pretrained Weights frozen box -->
  <rect x='18' y='42' width='78' height='154' rx='0' fill='none' stroke='currentColor' stroke-width='1.8'/>
  <text x='57' y='119' text-anchor='middle' font-size='9' font-family='sans-serif' fill='currentColor' transform='rotate(-90,57,119)'>Pretrained Weights</text>
  <!-- B = 0 trapezoid (wider at top → narrow at rank r bottom) -->
  <polygon points='118,42 282,42 236,102 164,102' fill='none' stroke='var(--color-primary)' stroke-width='1.8'/>
  <text x='200' y='78' text-anchor='middle' font-size='13' font-family='sans-serif' fill='var(--color-primary)'>B = 0</text>
  <!-- rank r bracket between trapezoids -->
  <path d='M 158,106 Q 158,116 200,116 Q 242,116 242,106' fill='none' stroke='currentColor' stroke-width='1.2'/>
  <text x='200' y='126' text-anchor='middle' font-size='11' font-family='sans-serif' font-style='italic' fill='currentColor'>r</text>
  <!-- A = U(-b,b) trapezoid (narrow at rank r top → wider at bottom) -->
  <polygon points='164,130 236,130 282,196 118,196' fill='none' stroke='var(--color-primary)' stroke-width='1.8'/>
  <text x='200' y='166' text-anchor='middle' font-size='11' font-family='sans-serif' fill='var(--color-primary)'>A = U(-b, b)</text>
  <!-- x green bar -->
  <rect x='15' y='200' width='270' height='13' rx='0' stroke='var(--color-green)' stroke-width='1.5' fill='none'/>
  <!-- x label -->
  <text x='150' y='226' text-anchor='middle' font-size='13' font-family='sans-serif' font-style='italic' fill='currentColor'>x</text>
</svg>`;

  ia3Svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 252' width='300px' height='252px'>

  <!-- ========== ATTENTION SIDE ========== -->

  <!-- Output arrow at top-left -->
  <line x1='18' y1='24' x2='18' y2='10' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='13,10 23,10 18,5' fill='currentColor'/>
  <!-- Top horizontal rail: connects ⊙_V path to softmax output path -->
  <line x1='18' y1='24' x2='145' y2='24' stroke='currentColor' stroke-width='1.5'/>

  <!-- softmax → rail (vertical at softmax center x=145, from softmax top y=106 to rail y=24) -->
  <line x1='145' y1='106' x2='145' y2='24' stroke='currentColor' stroke-width='1.5'/>

  <!-- softmax box (green border). Center x=145, center y=120, top=106, bottom=134 -->
  <rect x='108' y='106' width='74' height='28' fill='none' stroke='var(--color-green)' stroke-width='1.5'/>
  <text x='145' y='124' text-anchor='middle' font-size='11' font-family='sans-serif' fill='currentColor'>softmax</text>

  <!-- ⊙_V circle: far-left column, ABOVE the softmax level: cx=18, cy=68 -->
  <circle cx='18' cy='68' r='9' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='18' y='73' text-anchor='middle' font-size='15' font-family='sans-serif' fill='currentColor'>&#x2219;</text>
  <!-- ⊙_V → rail (upward, no arrowhead – just joins rail) -->
  <line x1='18' y1='59' x2='18' y2='24' stroke='currentColor' stroke-width='1.5'/>

  <!-- ℓ_V box: to the RIGHT of ⊙_V, same height -->
  <rect x='34' y='59' width='46' height='18' fill='none' stroke='var(--color-primary)' stroke-width='1.5'/>
  <text x='57' y='72' text-anchor='middle' font-size='11' font-family='sans-serif' fill='var(--color-primary)'>&#x2113;<tspan dy='3' font-size='8'>V</tspan></text>
  <!-- Arrow: ℓ_V → ⊙_V (pointing LEFT, tip at ⊙_V right edge x=27) -->
  <polygon points='34,64 34,72 28,68' fill='currentColor'/>

  <!-- V box: bottom-left, directly below ⊙_V column -->
  <rect x='3' y='180' width='30' height='24' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='18' y='196' text-anchor='middle' font-size='13' font-family='sans-serif' fill='currentColor'>V</text>
  <!-- V → ⊙_V (upward, arrowhead at ⊙_V bottom y=77) -->
  <line x1='18' y1='180' x2='18' y2='79' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='13,79 23,79 18,73' fill='currentColor'/>

  <!-- ⊙_K circle: same vertical level as softmax center (cy=120), left of softmax -->
  <!-- cx=93, cy=120. left=84, right=102. Softmax left=108 -->
  <circle cx='93' cy='120' r='9' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='93' y='125' text-anchor='middle' font-size='15' font-family='sans-serif' fill='currentColor'>&#x2219;</text>
  <!-- ⊙_K → softmax LEFT SIDE (horizontal arrow at y=120, entering from the left) -->
  <line x1='102' y1='120' x2='105' y2='120' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='103,116 103,124 109,120' fill='currentColor'/>

  <!-- ℓ_K box: to the LEFT of ⊙_K, same height -->
  <!-- x=38, w=40, right=78. ⊙_K left=84. gap=6px -->
  <rect x='38' y='110' width='40' height='20' fill='none' stroke='var(--color-primary)' stroke-width='1.5'/>
  <text x='58' y='124' text-anchor='middle' font-size='11' font-family='sans-serif' fill='var(--color-primary)'>&#x2113;<tspan dy='3' font-size='8'>K</tspan></text>
  <!-- Arrow: ℓ_K → ⊙_K (pointing RIGHT, tip at ⊙_K left edge x=84) -->
  <line x1='78' y1='120' x2='80' y2='120' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='78,116 78,124 84,120' fill='currentColor'/>

  <!-- K box: at x=93 column, bottom row -->
  <rect x='77' y='180' width='32' height='24' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='93' y='196' text-anchor='middle' font-size='13' font-family='sans-serif' fill='currentColor'>K</text>
  <!-- K → ⊙_K (upward, arrowhead at ⊙_K bottom y=129) -->
  <line x1='93' y1='180' x2='93' y2='131' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='88,131 98,131 93,125' fill='currentColor'/>

  <!-- Q box: directly below softmax center (x=145), bottom row -->
  <rect x='130' y='180' width='30' height='24' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='145' y='196' text-anchor='middle' font-size='13' font-family='sans-serif' fill='currentColor'>Q</text>
  <!-- Q → softmax BOTTOM (upward, separate from K/⊙K path — enters softmax from below) -->
  <line x1='145' y1='180' x2='145' y2='136' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='140,136 150,136 145,130' fill='currentColor'/>

  <!-- ========== SEPARATOR ========== -->
  <line x1='196' y1='5' x2='196' y2='216' stroke='currentColor' stroke-width='0.5' stroke-dasharray='4,4'/>

  <!-- ========== FFN SIDE (center x=251) ========== -->

  <!-- h label + output arrow -->
  <text x='251' y='13' text-anchor='middle' font-size='12' font-family='sans-serif' font-style='italic' fill='currentColor'>h</text>
  <line x1='251' y1='25' x2='251' y2='19' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='246,19 256,19 251,13' fill='currentColor'/>

  <!-- dense top -->
  <rect x='213' y='25' width='76' height='26' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='251' y='42' text-anchor='middle' font-size='11' font-family='sans-serif' fill='currentColor'>dense</text>

  <!-- ⊙_FF → dense top -->
  <line x1='251' y1='66' x2='251' y2='52' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='246,52 256,52 251,46' fill='currentColor'/>

  <!-- ⊙_FF circle -->
  <circle cx='251' cy='76' r='9' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='251' y='81' text-anchor='middle' font-size='15' font-family='sans-serif' fill='currentColor'>&#x2219;</text>

  <!-- ℓ_FF box: to the RIGHT of ⊙_FF -->
  <rect x='266' y='66' width='30' height='20' fill='none' stroke='var(--color-primary)' stroke-width='1.5'/>
  <text x='281' y='80' text-anchor='middle' font-size='9' font-family='sans-serif' fill='var(--color-primary)'>&#x2113;<tspan dy='3' font-size='7'>FF</tspan></text>
  <!-- Arrow: ℓ_FF → ⊙_FF (pointing LEFT) -->
  <polygon points='266,71 266,81 260,76' fill='currentColor'/>

  <!-- nonlinearity → ⊙_FF -->
  <line x1='251' y1='116' x2='251' y2='87' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='246,87 256,87 251,81' fill='currentColor'/>

  <!-- nonlinearity box (green border) -->
  <rect x='213' y='116' width='76' height='26' fill='none' stroke='var(--color-green)' stroke-width='1.5'/>
  <text x='251' y='133' text-anchor='middle' font-size='10' font-family='sans-serif' fill='currentColor'>nonlinearity</text>

  <!-- dense bottom → nonlinearity -->
  <line x1='251' y1='164' x2='251' y2='144' stroke='currentColor' stroke-width='1.5'/>
  <polygon points='246,144 256,144 251,138' fill='currentColor'/>

  <!-- dense bottom -->
  <rect x='213' y='164' width='76' height='26' fill='none' stroke='currentColor' stroke-width='1.5'/>
  <text x='251' y='181' text-anchor='middle' font-size='11' font-family='sans-serif' fill='currentColor'>dense</text>

  <!-- Input line stub at bottom of FFN -->
  <line x1='251' y1='190' x2='251' y2='205' stroke='currentColor' stroke-width='1.5'/>

  <!-- Section labels -->
  <text x='85' y='220' text-anchor='middle' font-size='9' font-family='sans-serif' fill='currentColor' opacity='0.6'>Attention</text>
  <text x='251' y='218' text-anchor='middle' font-size='9' font-family='sans-serif' fill='currentColor' opacity='0.6'>FFN</text>
</svg>`;

  benzeneSvg = `
  <svg version='1.1' baseProfile='full'
              xmlns='http://www.w3.org/2000/svg'
                      xmlns:rdkit='http://www.rdkit.org/xml'
                      xmlns:xlink='http://www.w3.org/1999/xlink'
                      xml:space='preserve'
              width='300px' height='200px' viewBox='0 0 300 200'>
  <!-- END OF HEADER -->
    <rect style='opacity:0.0;fill:none;stroke:none' width='300.0' height='200.0' x='0.0' y='0.0'> </rect>
    <path class='bond-0 atom-0 atom-1' d='M 253.9,100.0 L 202.0,190.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-0 atom-0 atom-1' d='M 235.9,100.0 L 193.0,174.4' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-1 atom-1 atom-2' d='M 202.0,190.0 L 98.0,190.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-2 atom-2 atom-3' d='M 98.0,190.0 L 46.1,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-2 atom-2 atom-3' d='M 107.0,174.4 L 64.1,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-3 atom-3 atom-4' d='M 46.1,100.0 L 98.0,10.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-4 atom-4 atom-5' d='M 98.0,10.0 L 202.0,10.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-4 atom-4 atom-5' d='M 107.0,25.6 L 193.0,25.6' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-5 atom-5 atom-0' d='M 202.0,10.0 L 253.9,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path d='M 251.3,104.5 L 253.9,100.0 L 251.3,95.5' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 204.6,185.5 L 202.0,190.0 L 196.8,190.0' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 103.2,190.0 L 98.0,190.0 L 95.4,185.5' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 48.7,104.5 L 46.1,100.0 L 48.7,95.5' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 95.4,14.5 L 98.0,10.0 L 103.2,10.0' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 196.8,10.0 L 202.0,10.0 L 204.6,14.5' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
  </svg>`;

  tolueneSvg = `<svg version='1.1' baseProfile='full'
              xmlns='http://www.w3.org/2000/svg'
                      xmlns:rdkit='http://www.rdkit.org/xml'
                      xmlns:xlink='http://www.w3.org/1999/xlink'
                  xml:space='preserve'
              width='300px' height='200px' viewBox='0 0 300 200'>
  <!-- END OF HEADER -->
    <rect style='opacity:0.0;fill:none;stroke:none' width='300.0' height='200.0' x='0.0' y='0.0'> </rect>
    <path class='bond-0 atom-0 atom-1' d='M 285.0,100.0 L 195.0,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-1 atom-1 atom-2' d='M 195.0,100.0 L 150.0,177.9' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-1 atom-1 atom-2' d='M 179.4,100.0 L 142.2,164.4' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-2 atom-2 atom-3' d='M 150.0,177.9 L 60.0,177.9' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-3 atom-3 atom-4' d='M 60.0,177.9 L 15.0,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-3 atom-3 atom-4' d='M 67.8,164.4 L 30.6,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-4 atom-4 atom-5' d='M 15.0,100.0 L 60.0,22.1' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-5 atom-5 atom-6' d='M 60.0,22.1 L 150.0,22.1' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-5 atom-5 atom-6' d='M 67.8,35.6 L 142.2,35.6' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-6 atom-6 atom-1' d='M 150.0,22.1 L 195.0,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path d='M 152.2,174.0 L 150.0,177.9 L 145.5,177.9' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 64.5,177.9 L 60.0,177.9 L 57.7,174.0' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 17.2,103.9 L 15.0,100.0 L 17.3,96.1' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 57.8,26.0 L 60.0,22.1 L 64.5,22.1' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 145.5,22.1 L 150.0,22.1 L 152.3,26.0' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
  </svg>`;

  phenolSvg = `<svg version='1.1' baseProfile='full'
              xmlns='http://www.w3.org/2000/svg'
                      xmlns:rdkit='http://www.rdkit.org/xml'
                      xmlns:xlink='http://www.w3.org/1999/xlink'
                  xml:space='preserve'
              width='300px' height='200px' viewBox='0 0 300 200'>
  <!-- END OF HEADER -->
    <rect style='opacity:0.0;fill:none;stroke:none' width='300.0' height='200.0' x='0.0' y='0.0'> </rect>
    <path class='bond-0 atom-0 atom-1' d='M 134.3,168.9 L 54.8,168.9' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-0 atom-0 atom-1' d='M 127.4,156.9 L 61.6,156.9' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-1 atom-1 atom-2' d='M 54.8,168.9 L 15.0,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-2 atom-2 atom-3' d='M 15.0,100.0 L 54.8,31.1' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-2 atom-2 atom-3' d='M 28.8,100.0 L 61.6,43.1' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-3 atom-3 atom-4' d='M 54.8,31.1 L 134.3,31.1' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-4 atom-4 atom-5' d='M 134.3,31.1 L 174.0,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-4 atom-4 atom-5' d='M 127.4,43.1 L 160.3,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-5 atom-5 atom-6' d='M 174.0,100.0 L 240.6,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-6 atom-5 atom-0' d='M 174.0,100.0 L 134.3,168.9' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path d='M 130.3,168.9 L 134.3,168.9 L 136.3,165.4' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 58.7,168.9 L 54.8,168.9 L 52.8,165.4' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 17.0,103.4 L 15.0,100.0 L 17.0,96.6' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 52.8,34.6 L 54.8,31.1 L 58.7,31.1' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 130.3,31.1 L 134.3,31.1 L 136.3,34.6' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path class='atom-6' d='M 243.2 100.1
    Q 243.2 94.7, 245.9 91.6
    Q 248.5 88.6, 253.5 88.6
    Q 258.5 88.6, 261.2 91.6
    Q 263.9 94.7, 263.9 100.1
    Q 263.9 105.5, 261.2 108.7
    Q 258.5 111.7, 253.5 111.7
    Q 248.6 111.7, 245.9 108.7
    Q 243.2 105.6, 243.2 100.1
    M 253.5 109.2
    Q 257.0 109.2, 258.8 106.9
    Q 260.7 104.6, 260.7 100.1
    Q 260.7 95.6, 258.8 93.4
    Q 257.0 91.2, 253.5 91.2
    Q 250.1 91.2, 248.2 93.4
    Q 246.4 95.6, 246.4 100.1
    Q 246.4 104.6, 248.2 106.9
    Q 250.1 109.2, 253.5 109.2
    ' fill='var(--color-primary)'/>
    <path class='atom-6' d='M 267.4 88.9
    L 270.4 88.9
    L 270.4 98.4
    L 281.9 98.4
    L 281.9 88.9
    L 285.0 88.9
    L 285.0 111.4
    L 281.9 111.4
    L 281.9 101.0
    L 270.4 101.0
    L 270.4 111.4
    L 267.4 111.4
    L 267.4 88.9
    ' fill='var(--color-primary)'/>
  </svg>`;
}
