import {
  Component,
  Input,
  HostListener,
  ElementRef,
  OnInit,
  Renderer2,
  effect,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css'],
  standalone: true,
  imports: [],
  animations: [
    // Animate the content area's opacity (for a fade effect)
    trigger('toggleContent', [
      state(
        'expanded',
        style({
          opacity: 1,
          paddingTop: '*',
          paddingBottom: '*',
        }),
      ),
      state(
        'collapsed',
        style({
          opacity: 0,
          paddingTop: '0px',
          paddingBottom: '0px',
        }),
      ),
      transition('expanded <=> collapsed', animate('150ms ease-out')),
    ]),
    // Animate the outer container's max-height between expanded and collapsed
    trigger('containerCollapse', [
      state(
        'expanded',
        style({
          maxHeight: '{{ expandedHeight }}',
        }),
        { params: { expandedHeight: '300px' } },
      ),
      state(
        'collapsed',
        style({
          maxHeight: '{{ titleBarHeight }}',
        }),
        { params: { titleBarHeight: '2.5rem' } },
      ),
      state('none', style({})),
      transition('expanded <=> collapsed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class WindowComponent implements OnInit {
  @Input() windowTitle: string = 'Window Title';
  @Input() showMaximize: boolean = false;
  // When maximized, the window uses this maxHeight
  @Input() maxHeight: string = 'calc(100vh - 2rem)';
  // When wordWrap is enabled in normal mode, the outer container's fixed height
  @Input() normalMaxHeight: string = '300px';
  // When wordWrap is false, the window expands naturally; fallback value for animation
  @Input() expandedHeightFallback: string = '1000px';
  // Option to initialize the window as minimized
  @Input() initialMinimized: boolean = false;
  // When wordWrap is false, no height constraint is applied in normal mode
  @Input() wordWrap: boolean = false;
  // Disable animation flag so it doesn't interfere with theme toggling
  @Input() disableAnimations: boolean = false;

  // Fixed title bar height, matching h-10 (2.5rem)
  titleBarHeight: string = '2.5rem';

  minimized = false;
  maximized = false;
  private previousMinimizedState = false;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private themeService: ThemeService,
  ) {
    effect(() => {
      const changing = this.themeService.themeChanging();
      this.disableAnimations = changing;
    });
  }

  ngOnInit(): void {
    this.minimized = this.initialMinimized;
  }

  toggleMinimize(): void {
    this.minimized = !this.minimized;
  }

  toggleMaximize(event: Event): void {
    event.stopPropagation();

    const windowElement = this.elRef.nativeElement;

    if (this.maximized) {
      // RESTORE WINDOW - simple approach with no animation first
      this.renderer.removeClass(windowElement, 'absolute');
      this.renderer.removeClass(windowElement, 'inset-x-0');
      this.renderer.removeClass(windowElement, 'top-0');
      this.renderer.removeClass(windowElement, 'max-w-full');
      this.renderer.removeClass(windowElement, 'max-h-dvh');
      this.renderer.removeClass(windowElement, 'z-100');
      this.renderer.removeClass(windowElement, 'shadow-xl');

      // Update state
      this.maximized = false;
      this.minimized = this.previousMinimizedState;
    } else {
      // Save state
      this.previousMinimizedState = this.minimized;
      this.minimized = false;

      // MAXIMIZE WINDOW - apply classes directly
      this.renderer.addClass(windowElement, 'absolute');
      this.renderer.addClass(windowElement, 'inset-x-0');
      this.renderer.addClass(windowElement, 'top-0');
      this.renderer.addClass(windowElement, 'max-w-full');
      this.renderer.addClass(windowElement, 'max-h-dvh');
      this.renderer.addClass(windowElement, 'z-100');
      this.renderer.addClass(windowElement, 'shadow-xl');

      this.maximized = true;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.maximized) {
      const clickedInside = this.elRef.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.toggleMaximize(event);
      }
    }
  }
}
