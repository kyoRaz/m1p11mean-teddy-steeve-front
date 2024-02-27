import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {

  constructor(private http: HttpClient) { }

  getHistorique(data: any) {
    let url = environment.baseUrl + 'rdvs/historique';
    let params = new HttpParams();
    console.log("🚀 ~ HistoriqueService ~ getHistorique ~ data:", data);

    if (data) {
      if (data.dateDebut) {
        params = params.set('dateDebut', data.dateDebut);
      }
      if (data.dateFin) {
        params = params.set('dateFin', data.dateFin);
      }
    }

    return this.http.get<any>(url, { params });
  }

  getSuiviDone(data: any) {
    let url = environment.baseUrl + `rdvDetails/done/${data.idUser}`;
    let params = new HttpParams();
    console.log("🚀 ~ HistoriqueService ~ getHistorique ~ data:", data);

    if (data) {
      if (data.dateDebut) {
        params = params.set('debut', data.dateDebut);
      }
      if (data.dateFin) {
        params = params.set('fin', data.dateFin);
      }
      if (data.page) {
        params = params.set('page', data.page);
      }
      if (data.size) {
        params = params.set('pageSize ', data.size);
      }
    }

    return this.http.get<any>(url, { params });
  }



}
