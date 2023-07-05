import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token } from '../models/auth.models';
import { appconfig } from 'src/environments/environment';

import { AuthService, ConfigStateService } from '@abp/ng.core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Token>;
  public currentUser: Observable<Token>;

  userProfile: object;
  
  /**
   ** current user
  */
  public get currentUserValue(): Token {
    return this.currentUserSubject.value;
  }

  public get hasLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  public loadUserProfile(): void {
    this.oAuthService.loadUserProfile().then((userprofile) => (this.userProfile = userprofile));
  }

  public get getAccessToken() {
    return this.oAuthService.getAccessToken();
  }

  public get getAccessTokenExpiration() {
    return this.oAuthService.getAccessTokenExpiration();
  }

  public get givenName() {
    var claims = this.oAuthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }

  public get familyName() {
    var claims = this.oAuthService.getIdentityClaims();
    if (!claims) return null;
    return claims['family_name'];
  }

  protected authService: AuthService;
  protected configState: ConfigStateService;

  constructor(private oAuthService: OAuthService, protected injector: Injector) {
    this.authService = injector.get(AuthService);
    this.currentUserSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    let loginParams = ({ 'username': username, 'password': password });
    return this.authService.login(loginParams).pipe(map(() => {})); 
  }

  logout() {
    return this.authService.logout().pipe(map(() => {
      this.authService.navigateToLogin();
    }));
  }

  // public flights: Flight[] = [];

  // public find(from: string, to: string) {
  //     var url = authconfig.application.baseUrl + "/api/secureflight";

  //     var search = new URLSearchParams();
  //     search.set('from', from);
  //     search.set('to', to);

  //     var headers = new Headers();
  //     headers.set('Accept', 'text/json');
  //     headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken())

  //     return new Observable((observer: Observer<Flight[]>) => {
  //         this.http
  //             .get(url, { search, headers })
  //             .map(resp => resp.json())
  //             .subscribe((flights) => {
  //                 this.flights = flights;
  //                 observer.next(flights);
  //             });
  //     });
  // }
}