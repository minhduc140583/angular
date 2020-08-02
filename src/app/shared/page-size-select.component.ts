import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'page-size-select',
  templateUrl: './page-size-select.component.html',
  styleUrls: ['./page-size-select.component.css']
})
export class PageSizeSelectComponent implements OnChanges {
  @Input() pageSizes: number[];
  @Input() pageSize: number;
  @Output() pageSizeChanged = new EventEmitter<any>();
  currentPageSize: number;
  constructor() {
  }

  onPageSizeChanged(event: Event) {
    this.pageSizeChanged.emit(this.currentPageSize);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.currentPageSize = this.pageSize;
  }
}
