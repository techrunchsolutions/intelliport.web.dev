import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbAccordionModule, NgbNavModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';

import { SharedModule } from '../../shared/shared.module';
import { UtilityRoutingModule } from './utility-routing.modules';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    UtilityRoutingModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbDropdownModule,
    SimplebarAngularModule
  ]
})
export class UtilityModule { }
