import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  constructor(private http: HttpClient) { }

  getRDV(id: string | undefined) {
    const url = environment.baseUrl + `rdvs/${id}`;
    return this.http.get<any>(url);
  }

  getListDetails(id: string | undefined) {
    const url = environment.baseUrl + `rdvs/historiqueDetail/${id}`;
    return this.http.get<any>(url);
  }


}
