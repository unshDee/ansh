import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { WindowComponent } from '../../shared/components/window/window.component';
import { AnalyticsService } from '../../core/services/analytics.service';

@Component({
  selector: 'app-home',
  imports: [WindowComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('ribbonAnimate') ribbonAnimate?: ElementRef<SVGAnimateElement>;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    // Track home page view
    this.analyticsService.trackEvent('page_view', {
      page_title: 'Home',
      page_location: '/home',
    });
  }

  ngAfterViewInit() {
    // Respect reduced motion and ensure SMIL starts when routed into the SPA
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    setTimeout(() => {
      this.ribbonAnimate?.nativeElement.beginElement();
    }, 0);
  }
}
