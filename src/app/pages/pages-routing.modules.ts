import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardsComponent } from './dashboards/dashboards.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardsComponent
  },
  { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
  { path: 'administration', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
  { path: 'frontoffice', loadChildren: () => import('./frontoffice/frontoffice.module').then(m => m.FrontOfficeModule) },
  { path: 'backoffice', loadChildren: () => import('./backoffice/backoffice.module').then(m => m.BackOfficeModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }