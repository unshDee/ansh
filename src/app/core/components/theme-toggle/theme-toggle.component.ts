import {Component, WritableSignal} from '@angular/core';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css'
})
export class ThemeToggleComponent {
  protected theme: WritableSignal<string>;

  constructor(private themeService: ThemeService) {
    this.theme = themeService.theme;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
