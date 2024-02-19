import { Directive, DoCheck, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements DoCheck {
  defaultColor = '#fff';
  @Input('appHighlight') highlightColor?: string;

  constructor(private elementRef: ElementRef) { }

  ngDoCheck(): void {
    this.addHighlight();
    setTimeout(() => this.removeHighlight(), 500);
  }

  private addHighlight(): void {
    (this.elementRef.nativeElement as HTMLElement).style.backgroundColor = this.highlightColor || this.defaultColor;
  }

  private removeHighlight(): void {
    (this.elementRef.nativeElement as HTMLElement).style.backgroundColor = this.defaultColor;
  }
}
