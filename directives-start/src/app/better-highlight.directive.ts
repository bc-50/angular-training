import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') bgColor: string = this.defaultColor;
  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit() {
    //this.renderer.setStyle(this.elRef.nativeElement, "background-color", "blue")
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    //this.renderer.setStyle(this.elRef.nativeElement, "background-color", "blue");
    this.bgColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    //this.renderer.setStyle(this.elRef.nativeElement, "background-color", "transparent")
    this.bgColor = this.defaultColor;
  }
}
