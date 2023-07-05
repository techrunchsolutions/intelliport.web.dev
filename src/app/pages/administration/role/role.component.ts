import { Component, OnInit, ViewChildren, QueryList, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { RoleService } from './role.service';
import { RoleSortableDirective, RoleSortEvent } from '../role/role.directive';
import { Router } from '@angular/router';
import { IdentityRoleDto } from '@abp/ng.identity/proxy';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  providers: [RoleService, DecimalPipe]
})  

/**
 * Role Component
 */
export class RoleComponent implements OnInit {
  
  // @Input() debounceTime = 200;
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  // title information
  pageitem!: string;
  regRole: boolean = false;

  roleData!: IdentityRoleDto[];
  hideme: boolean[] = [];
  tables$: Observable<IdentityRoleDto[]>;
  total$: Observable<number>;
  @ViewChildren(RoleSortableDirective)
  headers!: QueryList<RoleSortableDirective>;

  public isCollapsed = true;
  private isSent = false;
  constructor(public service: RoleService, private router: Router) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }
  
  ngOnInit(): void {
    //BreadCrumb 
    this.breadCrumbItems = [
      { label: 'Priviledges' },
      { label: 'Role Management', active: true }
    ];   
    
    /***
     * All Data Get
     */
    // this._fetchData();
  }

  getMouseOver(value: number) {
    if (this.isSent == false) {
      this.service.debounce = value;
      this.isSent = true;
    }    
    // console.log(value);
  }

  getMouseLeave(value: number) {
    if (this.isSent == true) {
      this.service.debounce = value;
      this.isSent = false;
    }
  }

  changeValue(i: any) {
    this.hideme[i] = !this.hideme[i];
  }

  /**
   * fetches the table value
   */
  _fetchData() {
    this.roleData = this.service.getRoleList();
    for (let i = 0; i <= this.roleData.length; i++) {
      this.hideme.push(true);
    }
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: RoleSortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}