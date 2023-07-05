import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/auth.service';
import { ToasterService } from '@abp/ng.theme.shared';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    protected toasterService: ToasterService;
    constructor(private authService: AuthenticationService, protected injector: Injector) { 
        this.toasterService = injector.get(ToasterService);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            // if (err.status === 401) {
            //     // auto logout if 401 response returned from api
            //     this.authService.logout();
            //     location.reload();
            // }
            var errorcode = err.error.error.code === null ? "Invalid!" : err.error.error.code;
            this.toasterService.error(
                errorcode + ': ' + err.error.error.message, 'Error!',
                { life: 7000 },
            );
            const error = err.message || err.statusText;
            return throwError(error);
        }))
    }
}