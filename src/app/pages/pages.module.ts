import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountToModule } from 'angular-count-to';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule, NgbAccordionModule, NgbNavModule, NgbProgressbarModule, NgbTooltipModule, NgbPopoverModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { UtilityModule } from './utility/utility.module';
import { AdministrationModule } from './administration/administration.module';
import { FrontOfficeModule } from './frontoffice/frontoffice.module';
import { BackOfficeModule } from './backoffice/backoffice.module';
import { IconsModule } from './icons/icons.module';
import { PagesRoutingModule } from './pages-routing.modules';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { WidgetModule } from '../shared/widget/widget.module';
import { SharedModule } from '../shared/shared.module';
import { SimplebarAngularModule } from 'simplebar-angular';

@NgModule({
  declarations: [
    DashboardsComponent
  ],
  imports: [
    CommonModule,
    WidgetModule,
    PagesRoutingModule,
    ScrollToModule.forRoot(),
    SimplebarAngularModule,
    NgApexchartsModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbProgressbarModule,
    NgbCollapseModule,
    NgbTooltipModule,
    NgbPopoverModule,
    CountToModule,
    UtilityModule,
    AdministrationModule,
    FrontOfficeModule,
    BackOfficeModule,
    IconsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE'
    }),
  ]
})
export class PagesModule { }
