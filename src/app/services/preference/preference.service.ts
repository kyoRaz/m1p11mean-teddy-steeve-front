import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(private http: HttpClient) { }

  getListEmploye() {
    return this.http.get<any>(environment.urlBack + 'users/employes/all');
  }

  getListService() {
    return this.http.get<any>(environment.urlBack + 'services');
  }

  getListPreference() {
    return this.http.get<any>(environment.urlBack + 'prefs');
  }

  createPreference(data: any) {
    return this.http.post<any>(environment.urlBack + 'prefs', data);
  }

  deletePreference(id: string | undefined) {
    const url = environment.urlBack + 'prefs/' + id;
    return this.http.delete<any>(url);
  }

  updatePreference(id: string | undefined, userData: any) {
    const url = environment.urlBack + `prefs/${id}`;
    return this.http.put<any>(url, userData);
  }

}
