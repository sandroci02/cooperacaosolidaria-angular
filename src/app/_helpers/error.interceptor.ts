import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../../app/_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ParametroData } from '../model/parametroData.model';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    parametro: ParametroData;

    constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute,
        private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Interceptor>>>>>>>>>>>>>");
        return next.handle(request).pipe(catchError(err => {
            console.log("error>>>>>>>>", err);

            if (err.status === 401 || err.status === 403) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                //  location.reload(true);
                //this.router.navigate(["/login"]);

                return throwError("Não autorizado");

            } else {

                const error = err.error.message || err.statusText;

                if (error === 'OK') {
                    let token = err.error.text;
                    this.authenticationService.concluidoLogin(token);

                    console.log(token);

                    localStorage.setItem('token', '' + token);
                    this.router.navigate(["/dashboard"]);


                }
                return throwError(error);
            }


        }))
    }
}