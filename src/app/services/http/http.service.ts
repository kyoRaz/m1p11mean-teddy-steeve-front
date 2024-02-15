import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { TokenService } from '../token/token.service';
import { Subject, catchError, tap ,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService  {

  private _refreshget =new Subject<void>();

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
  get(servicename: string) {
    let token = this.store.getToken();
    let matricule = this.store.getUser()['matricule'];
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
    const options = {
      headers: headers,
      withcredintial: false,
      params: new HttpParams().set('matricule', matricule),
    };
    const url = environment.baseUrl + servicename;
    return this.http.get<any>(url, options).pipe(
      tap(() => {
        this._refreshget.next();
      })
    );
  }
}
