import { Component } from '@angular/core';

import { ProjectTemplateComponent } from '../../shared/project-template/project-template.component';
import { WindowComponent } from '../../../../shared/components/window/window.component';
import { SafeHtmlPipe, SafeLatexPipe } from '../../../../shared/pipes';

@Component({
  selector: 'app-data-selection-peft',
  imports: [
    ProjectTemplateComponent,
    WindowComponent,
    SafeHtmlPipe,
    SafeLatexPipe,
  ],
  templateUrl: './data-selection-peft.component.html',
  styleUrl: './data-selection-peft.component.css',
})
export class DataSelectionPeftComponent {
  benzeneSvg = `
  <svg version='1.1' baseProfile='full'
              xmlns='http://www.w3.org/2000/svg'
                      xmlns:rdkit='http://www.rdkit.org/xml'
                      xmlns:xlink='http://www.w3.org/1999/xlink'
                      xml:space='preserve'
              width='300px' height='200px' viewBox='0 0 300 200'>
  <!-- END OF HEADER -->
    <rect style='opacity:0.0;fill:none;stroke:none' width='300.0' height='200.0' x='0.0' y='0.0'> </rect>
    <path class='bond-0 atom-0 atom-1' d='M 253.9,100.0 L 202.0,190.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-0 atom-0 atom-1' d='M 235.9,100.0 L 193.0,174.4' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-1 atom-1 atom-2' d='M 202.0,190.0 L 98.0,190.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-2 atom-2 atom-3' d='M 98.0,190.0 L 46.1,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-2 atom-2 atom-3' d='M 107.0,174.4 L 64.1,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-3 atom-3 atom-4' d='M 46.1,100.0 L 98.0,10.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-4 atom-4 atom-5' d='M 98.0,10.0 L 202.0,10.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-4 atom-4 atom-5' d='M 107.0,25.6 L 193.0,25.6' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-5 atom-5 atom-0' d='M 202.0,10.0 L 253.9,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path d='M 251.3,104.5 L 253.9,100.0 L 251.3,95.5' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 204.6,185.5 L 202.0,190.0 L 196.8,190.0' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 103.2,190.0 L 98.0,190.0 L 95.4,185.5' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 48.7,104.5 L 46.1,100.0 L 48.7,95.5' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 95.4,14.5 L 98.0,10.0 L 103.2,10.0' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 196.8,10.0 L 202.0,10.0 L 204.6,14.5' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
  </svg>`;

  tolueneSvg = `<svg version='1.1' baseProfile='full'
              xmlns='http://www.w3.org/2000/svg'
                      xmlns:rdkit='http://www.rdkit.org/xml'
                      xmlns:xlink='http://www.w3.org/1999/xlink'
                  xml:space='preserve'
              width='300px' height='200px' viewBox='0 0 300 200'>
  <!-- END OF HEADER -->
    <rect style='opacity:0.0;fill:none;stroke:none' width='300.0' height='200.0' x='0.0' y='0.0'> </rect>
    <path class='bond-0 atom-0 atom-1' d='M 285.0,100.0 L 195.0,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-1 atom-1 atom-2' d='M 195.0,100.0 L 150.0,177.9' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-1 atom-1 atom-2' d='M 179.4,100.0 L 142.2,164.4' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-2 atom-2 atom-3' d='M 150.0,177.9 L 60.0,177.9' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-3 atom-3 atom-4' d='M 60.0,177.9 L 15.0,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-3 atom-3 atom-4' d='M 67.8,164.4 L 30.6,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-4 atom-4 atom-5' d='M 15.0,100.0 L 60.0,22.1' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-5 atom-5 atom-6' d='M 60.0,22.1 L 150.0,22.1' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-5 atom-5 atom-6' d='M 67.8,35.6 L 142.2,35.6' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-6 atom-6 atom-1' d='M 150.0,22.1 L 195.0,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path d='M 152.2,174.0 L 150.0,177.9 L 145.5,177.9' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 64.5,177.9 L 60.0,177.9 L 57.7,174.0' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 17.2,103.9 L 15.0,100.0 L 17.3,96.1' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 57.8,26.0 L 60.0,22.1 L 64.5,22.1' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 145.5,22.1 L 150.0,22.1 L 152.3,26.0' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
  </svg>`;

  phenolSvg = `<svg version='1.1' baseProfile='full'
              xmlns='http://www.w3.org/2000/svg'
                      xmlns:rdkit='http://www.rdkit.org/xml'
                      xmlns:xlink='http://www.w3.org/1999/xlink'
                  xml:space='preserve'
              width='300px' height='200px' viewBox='0 0 300 200'>
  <!-- END OF HEADER -->
    <rect style='opacity:0.0;fill:none;stroke:none' width='300.0' height='200.0' x='0.0' y='0.0'> </rect>
    <path class='bond-0 atom-0 atom-1' d='M 134.3,168.9 L 54.8,168.9' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-0 atom-0 atom-1' d='M 127.4,156.9 L 61.6,156.9' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-1 atom-1 atom-2' d='M 54.8,168.9 L 15.0,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-2 atom-2 atom-3' d='M 15.0,100.0 L 54.8,31.1' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-2 atom-2 atom-3' d='M 28.8,100.0 L 61.6,43.1' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-3 atom-3 atom-4' d='M 54.8,31.1 L 134.3,31.1' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-4 atom-4 atom-5' d='M 134.3,31.1 L 174.0,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-4 atom-4 atom-5' d='M 127.4,43.1 L 160.3,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-5 atom-5 atom-6' d='M 174.0,100.0 L 240.6,100.0' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path class='bond-6 atom-5 atom-0' d='M 174.0,100.0 L 134.3,168.9' style='fill:none;fill-rule:evenodd;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
    <path d='M 130.3,168.9 L 134.3,168.9 L 136.3,165.4' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 58.7,168.9 L 54.8,168.9 L 52.8,165.4' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 17.0,103.4 L 15.0,100.0 L 17.0,96.6' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 52.8,34.6 L 54.8,31.1 L 58.7,31.1' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path d='M 130.3,31.1 L 134.3,31.1 L 136.3,34.6' style='fill:none;stroke:currentColor;stroke-width:2.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
    <path class='atom-6' d='M 243.2 100.1
    Q 243.2 94.7, 245.9 91.6
    Q 248.5 88.6, 253.5 88.6
    Q 258.5 88.6, 261.2 91.6
    Q 263.9 94.7, 263.9 100.1
    Q 263.9 105.5, 261.2 108.7
    Q 258.5 111.7, 253.5 111.7
    Q 248.6 111.7, 245.9 108.7
    Q 243.2 105.6, 243.2 100.1
    M 253.5 109.2
    Q 257.0 109.2, 258.8 106.9
    Q 260.7 104.6, 260.7 100.1
    Q 260.7 95.6, 258.8 93.4
    Q 257.0 91.2, 253.5 91.2
    Q 250.1 91.2, 248.2 93.4
    Q 246.4 95.6, 246.4 100.1
    Q 246.4 104.6, 248.2 106.9
    Q 250.1 109.2, 253.5 109.2
    ' fill='var(--color-primary)'/>
    <path class='atom-6' d='M 267.4 88.9
    L 270.4 88.9
    L 270.4 98.4
    L 281.9 98.4
    L 281.9 88.9
    L 285.0 88.9
    L 285.0 111.4
    L 281.9 111.4
    L 281.9 101.0
    L 270.4 101.0
    L 270.4 111.4
    L 267.4 111.4
    L 267.4 88.9
    ' fill='var(--color-primary)'/>
  </svg>`;
}
