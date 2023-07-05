import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PermissionManagementComponent } from './permission-management/permission-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { RoleComponent } from './role/role.component';
import { PermissionGuard } from '@abp/ng.core';

const routes: Routes = [
    {
        path: 'privileges/managepermission',
        component: PermissionManagementComponent
    },
    {
        path: 'privileges/manage', loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
        canActivate: [PermissionGuard], data: {
            requiredPolicy: 'AbpIdentity.Roles', // policy key for your component
        }, 
    },
    { path: 'profiles/manage', loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),}
    // { path: 'verification', loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule) },
    // { path: 'registration', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule { }