import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../../app/_services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("JwtInterceptor>>>>>>>>>>>>>");

        // add authorization header with jwt token if available
        if (localStorage.getItem('token')) {
            console.log("JwtInterceptorJwtInterceptor: ", localStorage.getItem('token') )
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
        }else{
            this.authenticationService.logout();
        }

        return next.handle(request);
    }
}