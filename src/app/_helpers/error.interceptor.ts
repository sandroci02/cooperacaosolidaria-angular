import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../../app/_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {


    constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute,
        private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 || err.status === 403) {
                this.authenticationService.logout();
                //this.router.navigate(["/login"]);

                return throwError("Não autorizado");

            } else {
                return throwError(err);
            }


        }))
    }
}