import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModule, NgbNavModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RoleSortableDirective } from './role/role.directive';
import { Select2Module } from 'ng-select2-component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgWizardModule } from 'ng-wizard';

import { SharedModule } from '../../shared/shared.module';
import { AdministrationRoutingModule } from './administration-routing.modules';

import { RoleComponent } from './role/role.component';
import { PermissionManagementComponent } from './permission-management/permission-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';

import { ThemeSharedModule } from '@abp/ng.theme.shared';


@NgModule({
  declarations: [
    PermissionManagementComponent,
    RoleComponent,
    RoleManagementComponent,
    RoleSortableDirective,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,    
    NgbNavModule,
    Select2Module,
    NgbDropdownModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgWizardModule,
    FlatpickrModule.forRoot(),
    SimplebarAngularModule,
    CKEditorModule,
    ThemeSharedModule,
  ]
})
export class AdministrationModule {}