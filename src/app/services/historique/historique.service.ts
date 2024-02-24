import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {

  constructor(private http: HttpClient) { }

  getHistorique(data: any) {
    let url = environment.urlBack + 'rdvs/historique';
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



}
