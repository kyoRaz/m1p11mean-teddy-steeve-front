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

  getTypeList() {
    const url = environment.baseUrl + `typeDepenses`;
    return this.http.get<any>(url);
  }

  createDepense(data: any) {
    const url = environment.baseUrl + `depenses`;
    return this.http.post<any>(url, data);
  }

  getDepense() {
    const url = environment.baseUrl + `depenses`;
    return this.http.get<any>(url);
  }


  filtertDepense(data: any) {
    const url = environment.baseUrl + `depenses/filtre`;
    let params = new HttpParams();

    if (data) {
      if (data.startDate) {
        params = params.set('startDate', data.startDate);
      }
      if (data.endDate) {
        params = params.set('endDate', data.endDate);
      }
    }

    return this.http.get<any>(url, { params });
  }

  updateDepense(id: any, data: any) {
    const url = environment.baseUrl + `depenses/${id}`;
    return this.http.put<any>(url, data);
  }

  deleteDepense(id: any) {
    const url = environment.baseUrl + `depenses/${id}`;
    return this.http.delete<any>(url);
  }

  ajoutSolde(id: any, montant: any) {
    const url = environment.baseUrl + `soldes`;
    return this.http.post<any>(url, { idUser: id, montant });
  }

  getSolde(id: any) {
    const url = environment.baseUrl + `soldes/${id}`;
    return this.http.get<any>(url);
  }

}
