import { Component, OnInit } from '@angular/core';
import { ReplaceableComponentsService } from '@abp/ng.core'; // imported ReplaceableComponentsService
import { eIdentityComponents } from '@abp/ng.identity'; // imported eIdentityComponents enum

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})

/**
 * Starter Component
 */
export class RoleManagementComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  
  constructor(
    private replaceableComponents: ReplaceableComponentsService, // injected the service
  ) {
    this.replaceableComponents.add({
      component: RoleManagementComponent,
      key: eIdentityComponents.Roles,
    });
  }

  ngOnInit(): void {
    //BreadCrumb 
    this.breadCrumbItems = [
      { label: 'Priviledges' },
      { label: 'Role Management', active: true }
    ];
  }

}