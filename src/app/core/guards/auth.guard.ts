import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { FbAuthenticationService } from '../services/authfb.service';
import { AuthenticationService } from '../services/auth.service';

import { appconfig } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private fbAuthService: FbAuthenticationService,
        private authService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (appconfig.defaultauth === 'firebase') {
            const currentUser = this.fbAuthService.currentUser();
            if (currentUser) {
                // logged in so return true
                return true;
            }
        } else {
            const hasLoggedIn = this.authService.hasLoggedIn;
            if (hasLoggedIn) {
                // logged in so return true
                return true;
            }
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}