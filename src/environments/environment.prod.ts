// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from '@abp/ng.core';

const baseUrl = 'https://ach-admin.app.redpay.africa';
const dashBoardPath = '/dashboard';
const logoutPath = '/account/login';

export const environment = {
  production: true,
  application: {
    baseUrl: baseUrl,
    name: 'IntelliPort',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://ach-identityserver.redpay.africa', // IdentityServer url
    redirectUri: baseUrl + dashBoardPath,
    clientId: 'IntelliPort_App',
    dummyClientSecret: '1q2w3e*',
    scope: 'offline_access address AuthServer AdminService AnalyticService IdentityService SaaSService email openid phone profile role',
    // postLogoutRedirectUri: baseUrl + logoutPath,
    // logoutUrl: logoutPath, 
    responseType: 'password', // Default value is code
    tokenEndpoint: 'https://ach-internalgateway.redpay.africa/connect/token', // Token Endpoint
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://ach-internalgateway.redpay.africa', // Gateway url
      rootNamespace: 'IntelliPort',
    }
  }
} as Environment;

export const appconfig = {
  production: true,
  application: {
    baseUrl: baseUrl,
    logoutUrl: logoutPath,
  },
  defaultauth: 'fakebackend',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
