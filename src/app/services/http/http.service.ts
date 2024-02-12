import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { TokenService } from '../token/token.service';
import { Subject, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private store: TokenService) { }

  getUsers(): any {
    let token = this.store.getToken();
    const headers = new HttpHeaders()
                      .set('Content-Type', 'application/json')
                      // .set('Authorization', 'Bearer ' + token)
                      ;
    const options = {
      headers: headers,
      withcredintial: false
    };
    return this.http.get<any>(environment.baseUrl + 'beauty/users', options).pipe(
      catchError((error) =>{
        console.error('An error has occurredr:', error);
        throw error;
      })
    );
  }
}
