import { Component } from '@angular/core';
import { WindowComponent } from '../../shared/components/window/window.component';

@Component({
  selector: 'app-page-not-found',
  imports: [
    WindowComponent,
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
  currentUrl: string = window.location.href;
}
