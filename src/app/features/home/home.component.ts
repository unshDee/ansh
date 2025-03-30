import { Component } from '@angular/core';
import { WindowComponent } from '../../shared/components/window/window.component';

@Component({
  selector: 'app-home',
  imports: [WindowComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
