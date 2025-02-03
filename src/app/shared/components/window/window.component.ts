import { Component, Input, HostListener, ElementRef, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css'],
  imports: [NgClass, NgIf],
  animations: [
    // Animate the content area's opacity (for a fade effect).
    trigger('toggleContent', [
      state('expanded', style({
        opacity: 1,
        paddingTop: '*',
        paddingBottom: '*'
      })),
      state('collapsed', style({
        opacity: 0,
        paddingTop: '0px',
        paddingBottom: '0px'
      })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out'))
    ]),
    // Animate the outer container's max-height between expanded and collapsed.
    trigger('containerCollapse', [
      state('expanded', style({
        maxHeight: '{{ expandedHeight }}'
      }), { params: { expandedHeight: '300px' } }),
      state('collapsed', style({
        maxHeight: '{{ titleBarHeight }}'
      }), { params: { titleBarHeight: '2.5rem' } }),
      state('none', style({})),
      transition('expanded <=> collapsed', animate('300ms ease-in-out'))
    ])
  ]
})
export class WindowComponent implements OnInit {
  @Input() title: string = 'Window Title';
  @Input() showMaximize: boolean = false;
  // When maximized, the window uses this maxHeight (e.g., nearly full viewport)
  @Input() maxHeight: string = 'calc(100vh - 2rem)';
  // When wordWrap is enabled in normal mode, the outer container's fixed height.
  @Input() normalMaxHeight: string = '300px';
  // When wordWrap is false, the window expands naturally; we use a fallback value for animation.
  @Input() expandedHeightFallback: string = '1000px';
  // Option to initialize the window as minimized.
  @Input() initialMinimized: boolean = false;
  // When wordWrap is false, no height constraint is applied in normal mode.
  @Input() wordWrap: boolean = false;

  // Fixed title bar height, matching h-10 (2.5rem)
  titleBarHeight: string = '2.5rem';

  minimized = false;
  maximized = false;
  private previousMinimizedState = false;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.minimized = this.initialMinimized;
  }

  toggleMinimize(): void {
    this.minimized = !this.minimized;
  }

  toggleMaximize(event: Event): void {
    event.stopPropagation();
    if (this.maximized) {
      this.maximized = false;
      this.minimized = this.previousMinimizedState;
      document.body.classList.remove('overflow-hidden');
    } else {
      this.previousMinimizedState = this.minimized;
      this.minimized = false;
      this.maximized = true;
      document.body.classList.add('overflow-hidden');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.maximized) {
      const clickedInside = this.elRef.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.maximized = false;
        this.minimized = this.previousMinimizedState;
        document.body.classList.remove('overflow-hidden');
      }
    }
  }
}
