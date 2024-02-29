import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { TokenService } from '../token/token.service';
import { Subject, catchError, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _refreshget = new Subject<void>();

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
    return this.http.get<any>(environment.baseUrl + 'users', options).pipe(
      catchError((error) => {
        console.error('An error has occurredr:', error);
        throw error;
      })
    );
  }
  fetchdata(servicename: string, pageNumber: number, pageSize: number, filtre: string) {
    let token = this.store.getToken();
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
    const options = {
      headers: headers,
      withcredintial: false,
      // params: new HttpParams().set('matricule', matricule),
    };
    const url = environment.baseUrl + `${servicename}?page=${pageNumber}&size=${pageSize}&filter=${filtre}`;
    return this.http.get<any>(url, options).pipe(
      tap(() => {
        this._refreshget.next();
      })
    );
  }
  async postbod(servicename: string, data: any) {
    console.log(servicename);

    const url = environment.baseUrl + servicename;
    let token = this.store.getToken();
    const headers = new HttpHeaders().set('Content-Type', 'Application/json');
    // .set('Authorization', 'Bearer ' + token)
    const options = {
      headers:
        headers,
      withcredintial: false,
      responseType: 'text' as 'text'
    };
    return this.http.post(url, data, options).pipe(
      tap(() => {
        // alert('succes')
        console.log(data);

        // this._refreshAllPostBod.next();
      })
    );
  }
  async deleteData(servicename: string) {
    const url = environment.baseUrl + servicename;
    let token = this.store.getToken();
    const headers = new HttpHeaders().set('Content-Type', 'Application/json');
    // .set('Authorization', 'Bearer ' + token)
    const options = {
      headers:
        headers,
      withcredintial: false,
      responseType: 'text' as 'text'
    };
    return this.http.delete(url).pipe(
      tap(() => {
        // alert('Delete succes')
      })
    );
  }
  async putData(servicename: string, data: any) {
    const url = environment.baseUrl + servicename;
    let token = this.store.getToken();
    const headers = new HttpHeaders().set('Content-Type', 'Application/json');
    // .set('Authorization', 'Bearer ' + token)
    const options = {
      headers:
        headers,
      withcredintial: false,
      responseType: 'text' as 'text'
    };
    return this.http.put(url, data, options).pipe(
      tap(() => {
        // alert('succes')
      })
    );
  }
  get(servicename: string) {
    let token = this.store.getToken();
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
    const options = {
      headers: headers,
      withcredintial: false
    };
    const url = environment.baseUrl + servicename;
    return this.http.get<any>(url, options).pipe(
      tap(() => {
        this._refreshget.next();
      })
    );
  }
  getOne(url: string, id: string) {
    return this.http.get<any>(environment.baseUrl + url + '/' + id)
      ;
  }

  changeEtat(id: any, data: any) {
    const url = environment.baseUrl + `rdvDetails/terminer/${id}`;
    return this.http.put<any>(url, data);
  }

}
