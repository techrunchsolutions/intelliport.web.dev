import { Component } from '@angular/core';
import { ReplaceableComponentsService } from '@abp/ng.core'; // imported ReplaceableComponentsService
import { eIdentityComponents } from '@abp/ng.identity'; // imported eIdentityComponents enum
import { eAccountComponents } from '@abp/ng.account'; // imported eAccountComponents enum
// import { LoginComponent } from './account/auth/login/login.component';
import { RegisterComponent } from './account/auth/register/register.component';
import { PermissionManagementComponent } from './pages/administration/permission-management/permission-management.component';
import { ePermissionManagementComponents } from '@abp/ng.permission-management'; // imported ePermissionManagementComponents enum
import { RoleManagementComponent } from './pages/administration/role-management/role-management.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private replaceableComponents: ReplaceableComponentsService, // injected the service
  ) {
    // this.replaceableComponents.add({
    //   component: RoleManagementComponent,
    //   key: eIdentityComponents.Roles,
    // });

    // this.replaceableComponents.add(
    //   {
    //     component: LoginComponent,
    //     key: eIdentityComponents.Users,
    //   });
    
    // this.replaceableComponents.add(
    //   {
    //     component: LoginComponent,
    //     key: eAccountComponents.Login,
    //   });
      
    this.replaceableComponents.add(
      {
        component: RegisterComponent,
        key: eAccountComponents.Register,
      }
    );
  }

  ngOnInit() {
  }
}