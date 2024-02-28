import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveData(key: string, data: any) {
    if (typeof data === 'string') {
      localStorage.setItem(key, data);
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  getData(key: string) {
    const data = localStorage.getItem(key);
    return data !== null ? JSON.parse(data) : null;
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }

  clearAll() {
    localStorage.clear();
  }
}
