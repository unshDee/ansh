import { Component } from '@angular/core';
import {WindowComponent} from '../../shared/components/window/window.component';

@Component({
  selector: 'app-about',
  imports: [
    WindowComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
