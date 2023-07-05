import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { emailSentBarChart, monthlyEarningChart, transactions, orders, users } from './dashboards.data';
import { ChartType } from './dashboards.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigStateService, PermissionService, PermissionDirective  } from '@abp/ng.core';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})

/**
 * Dashboard Component
 */
export class DashboardsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  emailSentBarChart!: ChartType;
  monthlyEarningChart!: ChartType;
  transactions: any;
  orders: any;
  users: any;
  // canCreateRole: boolean;
  // canViewRoles: boolean;
  // canUpdateUser: boolean;
  @ViewChild('content') content: any;

  constructor(private modalService: NgbModal, private config: ConfigStateService, private permissionService: PermissionService) { }

  ngOnInit(): void {
    document.body.style.backgroundImage = "url('')";

    //BreadCrumb 
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Dashboard', active: true }
    ];

    /**
     * Fetches the data
     */
    this.fetchData();
    // const currentUser = this.config.getOne("currentUser");
    // console.log(currentUser);
    // const config = this.config.getAll();
    // console.log(config);
    // this.canViewRoles = this.permissionService.getGrantedPolicy('AbpIdentity.Roles');
    // console.log(this.canViewRoles);
    // this.canCreateRole = this.permissionService.getGrantedPolicy('AbpIdentity.Roles.Create');
    // console.log(this.canCreateRole);
    // this.canUpdateUser = this.permissionService.getGrantedPolicy('AbpIdentity.Users.Update');
    // console.log(this.canUpdateUser);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // this.openModal();
    }, 2000);
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    this.emailSentBarChart = emailSentBarChart;
    this.monthlyEarningChart = monthlyEarningChart;
    this.transactions = transactions;
    this.orders = orders;
    this.users = users;
  }

  /***
   * Subscribe Model open
   */
  openModal() {
    this.modalService.open(this.content, { centered: true });
  }
}