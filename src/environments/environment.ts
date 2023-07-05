// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from '@abp/ng.core';

const baseUrl = 'http://34.245.233.89:8080'; // Redtech's server config
//const baseUrl = 'http://20.101.106.147:8080'; // Olaolu's server config
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
    //issuer: 'http://34.245.233.89:9200', // Redtech's server config// IdentityServer url
    issuer: 'http://20.101.106.147:9200', // Olaolu's server config // IdentityServer url
    redirectUri: baseUrl + dashBoardPath,
    clientId: 'IntelliPort_App',
    dummyClientSecret: '1q2w3e*',
    scope: 'offline_access address AuthServer AdminService AnalyticService IdentityService SaaSService email openid phone profile role',
    // postLogoutRedirectUri: baseUrl + logoutPath,
    // logoutUrl: logoutPath,
    responseType: 'password', // Default value is code
//    tokenEndpoint: 'http://34.245.233.89:8300/connect/token', // Redtech server config // Token Endpoint
    tokenEndpoint: 'http://20.101.106.147:8300/connect/token', // Olaolu's server config // Token Endpoint
    requireHttps: false
  },
  apis: {
    default: {
      //url: 'http://34.245.233.89:8300', // Redtech server config // Gateway url
      url: 'http://20.101.106.147:8300', // Olaolu's server config // Gateway url
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
