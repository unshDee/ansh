import { Component } from '@angular/core';
import {WindowComponent} from '../../shared/components/window/window.component';
// import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [
    WindowComponent,
    // RouterLink
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
