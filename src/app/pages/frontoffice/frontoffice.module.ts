import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModule, NgbNavModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Select2Module } from 'ng-select2-component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgWizardModule } from 'ng-wizard';

import { SharedModule } from '../../shared/shared.module';
import { FrontOfficeRoutingModule } from './frontoffice-routing.modules';

import { StarterComponent } from './starter/starter.component';
import { ApplicantComponent } from './applicant/applicant.component';

import { ApplicantSortableDirective } from './applicant/applicant.directive';

import { CallbackPipe } from '../../shared/pipe/callback.pipe';
import { SafeurlPipe } from '../../shared/pipe/safeurl.pipe';

@NgModule({
  declarations: [
    StarterComponent,
    ApplicantComponent,
    ApplicantSortableDirective,
    CallbackPipe,
    SafeurlPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    FrontOfficeRoutingModule,
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
    CKEditorModule
  ]
})
export class FrontOfficeModule {}