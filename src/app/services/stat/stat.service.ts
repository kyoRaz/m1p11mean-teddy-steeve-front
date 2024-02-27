import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http: HttpClient) { }

  getStatSemaine(id: any) {
    const url = environment.baseUrl + `statistiques/tempsTravailMoyenDUnEmploye`;
    let params = new HttpParams();
    params = params.set('idEmploye', id);
    return this.http.get<any>(url, { params });
  }

  getStatSemaineAll() {
    const url = environment.baseUrl + `statistiques/tempsTravailMoyenParEmploye`;
    return this.http.get<any>(url);
  }

  getReservationJour() {
    const url = environment.baseUrl + `statistiques/nombreReservationParJour`;
    return this.http.get<any>(url);
  }

  getReservationMois() {
    const url = environment.baseUrl + `statistiques/nombreReservationParMois`;
    return this.http.get<any>(url);
  }

  getBeneficeStat() {
    const url = environment.baseUrl + `statistiques/beneficeParMoisIncluantDepense`;
    return this.http.get<any>(url);
  }

}
