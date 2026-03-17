import { Component } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { filter } from 'rxjs';

import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ViewCounterService } from '../../services/view-counter.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, ThemeToggleComponent, AsyncPipe, DecimalPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  currentUrl: string = '';
  viewCount$;

  constructor(
    private router: Router,
    viewCounter: ViewCounterService,
  ) {
    this.viewCount$ = viewCounter.count$;

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });

    this.currentUrl = this.router.url;
  }

  isCurrentRoute(route: string): boolean {
    // console.log('Current URL:', this.currentUrl);
    return this.currentUrl.startsWith(route);
  }
}
