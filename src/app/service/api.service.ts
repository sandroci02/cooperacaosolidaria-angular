import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import * as jwt_decode from "jwt-decode";

import * as data from "../../assets/estados-cidades2.json";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  baseUrl = environment.apiPrefix;

  /*DOTNET*/

  do(base: string, parametro: any) {
    return this.http.post<any>(environment.apiPrefix + base, parametro
    );
  }

  get(base: string, parametro: any) {
    return this.http.get<any>(environment.apiPrefix + base);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  getEstados() {
    return data.default.estados;
  }

}
