import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../app/model/user';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { ParametroData } from '../model/parametroData.model';
import { PageData } from '../model/PageData.model';
import { PageDataDot } from '../model/PageDataDot.model';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {


    chave: String;

    constructor(private http: HttpClient, private route: ActivatedRoute,
        private router: Router) {

    }

    private loggedIn = new BehaviorSubject<boolean>(false); // {1}

    get isLoggedIn() {
        console.log("verificando lagado");

        var count = localStorage.length;// get count

        console.log(count);

        if (count > 0 && localStorage.get('token')) {
            this.loggedIn.next(true);
        } else {
            this.loggedIn.next(false);
        }
        return this.loggedIn.asObservable(); // {2}
    }

    concluidoLogin(token: String) {
        this.chave = token;
    }

    login(username: string, password: string) {
        let   pacote = {"email": username, "password": password}
        return this.http.post<PageDataDot>(environment.apiPrefix +'Auth/login', pacote);
    }

    trocaSenha(parametro: ParametroData): any {
        return this.http.post<PageData>(environment.apiPrefix + 'usuario/senha', parametro
        );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        this.router.navigate(["/login"]);
    }
}