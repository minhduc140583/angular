import {EventEmitter, OnChanges} from '@angular/core';
import {Directive, ElementRef, Input, Output} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[contenteditableModel]',
  host: {
    '(blur)': 'onBlur()'
  }
})
export class ContenteditableModelDirective implements OnChanges {
  @Input('contenteditableModel') model: any;
  // tslint:disable-next-line:no-output-rename
  @Output('contenteditableModelChange') update = new EventEmitter();

  private lastViewModel: any;


  constructor(private elRef: ElementRef) {
  }

  ngOnChanges(changes) {
    // if (isPropertyUpdated(changes, this.lastViewModel)) {
      this.lastViewModel = this.model;
      this.refreshView();
    // }
  }

  onBlur() {
    const value = this.elRef.nativeElement.innerText;
    this.lastViewModel = value;
    this.update.emit(value);
  }

  private refreshView() {
    this.elRef.nativeElement.innerText = this.model;
  }
}
