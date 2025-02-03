import { Component } from '@angular/core';
import {WindowComponent} from '../../shared/components/window/window.component';

@Component({
  selector: 'app-blog',
  imports: [
    WindowComponent
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

}
