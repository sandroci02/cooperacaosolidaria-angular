import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  baseUrl = environment.apiPrefix;

/*DOTNET*/

do(base: string, parametro: any) {
  return this.http.post<any>(environment.apiPrefix  + base , parametro
  );
}  

get(base: string, parametro: any) {
  return this.http.get<any>(environment.apiPrefix  + base);  
}  

  
}
