import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http: HttpClient) { }

  getStatSemaine(id: any) {
    const url = environment.urlBack + `statistiques/tempsTravailMoyenDUnEmploye`;
    let params = new HttpParams();
    params = params.set('idEmploye', id);
    return this.http.get<any>(url, { params });
  }

}