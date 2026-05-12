import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currentUrl: string = '';

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
        this.cdr.markForCheck();
      });

    this.currentUrl = this.router.url;
  }

  isCurrentRoute(route: string): boolean {
    // console.log('Current URL:', this.currentUrl);
    return this.currentUrl.startsWith(route);
  }
}
