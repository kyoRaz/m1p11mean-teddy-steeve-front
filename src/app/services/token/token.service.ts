import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isLogin = false;
  constructor(private cookieService: CookieService, private route: Router) { }

  signOut(): void {
    window.sessionStorage.clear();
    localStorage.clear();
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
}
