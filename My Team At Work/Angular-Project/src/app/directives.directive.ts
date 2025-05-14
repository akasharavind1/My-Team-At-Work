import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDirectives]'
})
export class DirectivesDirective {
  private el: ElementRef;

  @Input() value: any;

  constructor(el: ElementRef) {
    this.el = el;
}
 @HostBinding('class.selected') isSelected = false;

  @HostListener('click') onClick() {
    this.isSelected = !this.isSelected;
  }

}