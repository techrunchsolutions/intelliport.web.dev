import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { FbAuthenticationService } from '../services/authfb.service';
import { AuthenticationService } from '../services/auth.service';
import { appconfig } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private fbAuthService: FbAuthenticationService,
        private authService: AuthenticationService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // const headers = new HttpHeaders();
        // headers['Content-Type'] = `application/json`;
        // headers['Content-Type'] = `application/x-www-form-urlencoded`;
        // headers['Accept'] = `application/json`;
        // headers['Access-Control-Allow-Origin'] = `*`;
        
        if (appconfig.defaultauth === 'firebase') {
            // add authorization header with jwt token if available
            let currentUser = this.fbAuthService.currentUser();
            if (currentUser && currentUser.token) {
                // headers['Authorization'] = `Bearer ${currentUser.token}`;
                // request = request.clone({headers});
                // console.log(1);
                // console.log(currentUser.token);
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                });
            }
        } else {
            // add authorization header with jwt token if available
            if (this.authService.hasLoggedIn) {
                // headers['Authorization'] = `Bearer ${this.authService.getAccessToken}`;
                // request = request.clone({headers});
                // console.log(2);
                // console.log(this.authService.getAccessToken);
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${this.authService.getAccessToken}`,
                    },
                });
            }
        }
        return next.handle(request);
    }
}