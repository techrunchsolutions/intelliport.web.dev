import { CoreModule } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { AccountConfigModule } from '@abp/ng.account/config';
import { IdentityConfigModule } from '@abp/ng.identity/config';
import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
import { TenantManagementConfigModule } from '@abp/ng.tenant-management/config';
import { ThemeBasicModule } from '@abp/ng.theme.basic';
import { ThemeSharedModule } from '@abp/ng.theme.shared';

// import { OAuthModule } from 'angular-oauth2-oidc';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { appconfig, environment } from '../environments/environment';
import { initFirebaseBackend } from './authUtils';

import { FakeBackendInterceptor } from './core/helpers/fake-backend';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbTooltipModule, NgbPopoverModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LayoutsModule } from './layouts/layouts.module';
import { PagesModule } from './pages/pages.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RoleManagementComponent } from './pages/administration/role-management/role-management.component';
// import { PermissionManagementModule } from '@abp/ng.permission-management';

// import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

if (appconfig.defaultauth === 'firebase') {
  initFirebaseBackend(appconfig.firebaseConfig);
} else {
  FakeBackendInterceptor;
}
export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // OAuthModule,
    CoreModule.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
    }),    
    AccountConfigModule.forRoot(),
    IdentityConfigModule.forRoot(),
    TenantManagementConfigModule.forRoot(),
    SettingManagementConfigModule.forRoot(),
    ThemeBasicModule.forRoot(),
    ThemeSharedModule.forRoot(),
    
    TranslateModule.forRoot({
      defaultLanguage: 'ng',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(routes),
    // RouterModule.forRoot(routes, { useHash: true }),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    NgbModule,
    NgbTooltipModule,
    NgbPopoverModule,
    NgbNavModule,
    LayoutsModule,
    TranslateModule,
    InfiniteScrollModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    // { provide: LocationStrategy, useClass: HashLocationStrategy, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }