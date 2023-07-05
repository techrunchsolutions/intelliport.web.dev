import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { ApplicantDto, PageCode } from '../applicant/applicant.model';
import { ApplicantService } from './applicant.service';
import { ApplicantSortableDirective, ApplicantSortEvent } from '../applicant/applicant.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss'],
  providers: [ApplicantService, DecimalPipe]
})

/**
 * Applicant Component
 */
export class ApplicantComponent implements OnInit {
  // title information
  pageitem!: string;
  pagecode!: number;
  register: boolean = false;
  personinfo: boolean = false;
  enroll: boolean = false;
  hidesearch: boolean = true;

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  applicantData!: ApplicantDto[];
  hideme: boolean[] = [];

  applicants$: Observable<ApplicantDto[]>;
  total$: Observable<number>;

  @ViewChildren(ApplicantSortableDirective)
  headers!: QueryList<ApplicantSortableDirective>;

  private isSent = false;
  constructor(public service: ApplicantService, private router: Router) {
    this.applicants$ = service.applicants$;
    this.total$ = service.total$;
    this.service.ltrigger = true;
  }

  ngOnInit(): void {
    if(this.router.url === '/frontoffice/register/inquiry') {
      // Toggle feature behaviours
      this.register = true;
      this.personinfo = false;
      this.service.pageCode = 0;

      // Page Title
      this.pageitem = 'Manage Enrollment';

      // BreadCrumb 
      this.breadCrumbItems = [
        { label: 'Manage Enrollment' },
        { label: 'Enrollment Inquiry', active: true } 
      ];
    } else if(this.router.url === '/frontoffice/enrolment/inquiry') {
      // Toggle feature behaviours
      this.enroll = true;
      this.personinfo = false;

      // Page Title
      this.pageitem = 'Enrollment Inquiry';

      // BreadCrumb
      this.breadCrumbItems = [
        { label: 'Enrollment' },
        { label: 'Enrollment Inquiry', active: true }
      ];
    } else if(this.router.url === '/backoffice/afis/status') {
      // Toggle feature behaviours
      this.personinfo = false;

      // Page Title
      this.pageitem = 'AFIS Status';

      // BreadCrumb 
      this.breadCrumbItems = [
        { label: 'AFIS' },
        { label: 'AFIS Status', active: true }
      ];
    } else if(this.router.url === '/backoffice/personalization/inquiry') {
      // Toggle feature behaviours
      this.personinfo = false;

      // Page Title
      this.pageitem = 'Personalization Inquiry';

      // BreadCrumb 
      this.breadCrumbItems = [
        { label: 'Personalization' },
        { label: 'Personalization Inquiry', active: true }
      ];
    } else if(this.router.url === '/backoffice/qualityassurance/inquiry') {
      // Toggle feature behaviours
      this.personinfo = false;

      // Page Title
      this.pageitem = 'Quality Assurance Inquiry';

      // BreadCrumb 
      this.breadCrumbItems = [
        { label: 'Quality Assurance' },
        { label: 'Quality Assurance Inquiry', active: true }
      ];
    } else if(this.router.url === '/backoffice/issuance/inquiry') {
      // Toggle feature behaviours
      this.personinfo = false;

      // Page Title
      this.pageitem = 'Issuance Inquiry';

      // BreadCrumb
      this.breadCrumbItems = [
        { label: 'Issuance' },
        { label: 'Issuance Inquiry', active: true }
      ];
    } else if(this.router.url === '/utilities/application/status') {
      // Toggle feature behaviours
      this.register = false;
      this.personinfo = true;
      this.service.pageCode = PageCode.ALL;

      // Page Title
      this.pageitem = 'Application Status';

      // BreadCrumb 
      this.breadCrumbItems = [
        { label: 'Application Status' },
        { label: 'Application Status Inquiry', active: true }
      ];
    } else {
      // Toggle feature behaviours
      this.register = true;
      this.personinfo = false;
      this.service.pageCode = PageCode.ALL;

      // Page Title
      this.pageitem = 'Applicant Inquiry';

      // BreadCrumb 
      this.breadCrumbItems = [
        { label: 'Applicant' },
        { label: 'Applicant Inquiry', active: true }
      ];
    }
    
    /***
     * All Data Get
     */
    this._fetchData();
  }

  getKeyDown(value: boolean) {
    this.service.strigger = value;

    if (this.service.searchParam.length == 0) {
      this.service.ltrigger = true;
    }
  }

  getMouseOver(value: number) {
    if (this.isSent == false) {
      this.service.debounce = value;
      this.isSent = true;
    }
  }

  getMouseLeave(value: number) {
    if (this.isSent == true) {
      this.service.debounce = value;
      this.isSent = false;
    }
  }

  getAppStatusClass(appStatus) {
    var classList='';
    if(appStatus == "Pending") {
      classList = 'badge bg-warning'; 
    }else if (appStatus == "Registered") {
      classList = 'badge bg-info';
    }else if (appStatus == "Returned") {
      classList = 'badge bg-dark';
    }else if (appStatus == "Rejected" || appStatus == "AFIS Rejected") {
      classList = 'badge bg-danger';
    }else if (appStatus == "Escalated") {
      classList = 'badge bg-warning';
    }else if(appStatus == "Enrollment" || appStatus == "Enrolled" || appStatus == "AFIS Approved" || appStatus == "Production" || appStatus == "Produced" || appStatus == "Issued") {
      classList = 'badge bg-success';
    }
    return classList;
  }

  toggleSearch() {
    this.hidesearch = !this.hidesearch;
    this.service.searchParam = "";
    this.service.ltrigger = this.hidesearch == true ? true : false;
  }

  changeValue(i: any) {
    this.hideme[i] = !this.hideme[i];
  }

  /**
   * fetches the table value
   */
  _fetchData() {}

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: ApplicantSortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  toggleRightSidebar() {
    // this.settingsButtonClicked.emit();
  }
}