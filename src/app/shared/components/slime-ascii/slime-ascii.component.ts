import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import type { SlimeConfig } from './slime-ascii.types';

@Component({
  selector: 'app-slime-ascii',
  standalone: true,
  imports: [],
  templateUrl: './slime-ascii.component.html',
  styleUrl: './slime-ascii.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlimeAsciiComponent implements OnInit, OnDestroy {
  @Input({ required: true }) posterPath!: string;
  @Input({ required: true }) config!: SlimeConfig;
  @Input() animate = true;

  @ViewChild('pre', { static: true }) preRef!: ElementRef<HTMLPreElement>;

  private readonly el = inject(ElementRef);

  private rafId = 0;
  private running = false;

  ngOnInit(): void {
    this.applyDimensions();
    this.loadPoster();
  }

  ngOnDestroy(): void {
    this.stop();
    document.removeEventListener('visibilitychange', this.onVisibility);
  }

  private applyDimensions(): void {
    const pre = this.preRef.nativeElement;
    pre.style.setProperty('--slime-cols', String(this.config.gridWidth));
    pre.style.setProperty('--slime-rows', String(this.config.gridHeight));
  }

  private loadPoster(): void {
    fetch(this.posterPath)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.text();
      })
      .then((text) => {
        this.preRef.nativeElement.textContent = text;
        this.maybeAnimate();
      })
      .catch(() => {
        // Poster unavailable — start blank and animate anyway
        this.maybeAnimate();
      });
  }

  private maybeAnimate(): void {
    if (!this.animate) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    import('./slime-engine').then(({ createEngine }) => {
      const engine = createEngine(this.config);
      this.running = true;
      document.addEventListener('visibilitychange', this.onVisibility);
      this.scheduleFrame(engine);
    });
  }

  private readonly onVisibility = (): void => {
    if (document.hidden) {
      this.stop();
    } else {
      // Re-import is a no-op after first load (module cached)
      import('./slime-engine').then(({ createEngine }) => {
        if (this.running) return; // already restarted
        const engine = createEngine(this.config);
        this.running = true;
        this.scheduleFrame(engine);
      });
    }
  };

  private scheduleFrame(engine: { frame(): string }): void {
    const TARGET_FPS = 12;
    const INTERVAL = 1000 / TARGET_FPS;
    let last = 0;

    const loop = (ts: number): void => {
      if (!this.running) return;
      if (ts - last >= INTERVAL) {
        last = ts;
        this.preRef.nativeElement.textContent = engine.frame();
      }
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  private stop(): void {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
  }
}
