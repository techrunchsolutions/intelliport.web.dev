import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../shared/shared.module';
import { BackOfficeRoutingModule } from './backoffice-routing.modules';
import { NgbNavModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    BackOfficeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,    
    NgbNavModule,
    NgbDropdownModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    SimplebarAngularModule,
    CKEditorModule
  ]
})
export class BackOfficeModule { }