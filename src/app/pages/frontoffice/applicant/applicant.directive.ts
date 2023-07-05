import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ApplicantDto } from './applicant.model';

export type ApplicantSortColumn = keyof ApplicantDto | '';
export type ApplicantSortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: ApplicantSortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface ApplicantSortEvent {
  column: ApplicantSortColumn;
  direction: ApplicantSortDirection;
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'th[sortable]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class ApplicantSortableDirective {

  constructor() { }

  @Input() sortable: ApplicantSortColumn = '';
  @Input() direction: ApplicantSortDirection = '';
  @Output() sort = new EventEmitter<ApplicantSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}