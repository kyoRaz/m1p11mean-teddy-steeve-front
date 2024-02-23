import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(private http: HttpClient) {}

  getListEmploye(){
    return this.http.get<any>(environment.urlBack +'users/employes/all');
  }

  getListService(){
    return this.http.get<any>(environment.urlBack +'services');
  }

  getListPreference(){
    return this.http.get<any>(environment.urlBack +'prefs');
  }
  
  createPreference(data:any){
    return this.http.post<any>(environment.urlBack +'prefs', data);
  }


}
