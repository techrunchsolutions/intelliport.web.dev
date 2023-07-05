import { IdentityRoleDto } from '@abp/ng.identity/proxy';
import { Directive, EventEmitter, Input, Output } from '@angular/core';

export type RoleSortColumn = keyof IdentityRoleDto | '';
export type RoleSortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: RoleSortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface RoleSortEvent {
  column: RoleSortColumn;
  direction: RoleSortDirection;
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

export class RoleSortableDirective {

  constructor() { }

  @Input() sortable: RoleSortColumn = '';
  @Input() direction: RoleSortDirection = '';
  @Output() sort = new EventEmitter<RoleSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}