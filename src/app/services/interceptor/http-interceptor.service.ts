import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { catchError, finalize, map, Observable, throwError, timeout, TimeoutError } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { TokenService } from '../token/token.service';
import { Router } from '@angular/router';

const APP_XHR_TIMEOUT = 7000;

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(
    private loaderService: LoaderService,
    private token: TokenService,
    private httpservice: HttpService,
    private route: Router) { }

  totalrequest = 0;
  completedRequest = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalrequest++;
    this.loaderService.isLoading.next(true);
    // alert(this.token.getToken());
    const modifiedReq = req.clone({
      setHeaders: {
        'x-auth-token': `${this.token.getToken()}`,
      }
    });
    return next
      .handle(modifiedReq)
      .pipe(
        timeout(APP_XHR_TIMEOUT),
        map((res) => this.handleSuccessfulResponse(res)),
        catchError((err) => this.handleErrorResponse(err)),
        finalize(this.handleRequestCompleted.bind(this))
      );
  }
  private handleSuccessfulResponse(event: any): HttpResponse<any> {
    return event;
  }
  private handleErrorResponse(errorResponse: any): Observable<HttpEvent<any>> {

    let printerror = '';

    if (errorResponse instanceof TimeoutError) {
      printerror = 'Timeout request';
      return throwError(() => new Error("Timeout request"));
    }

    switch (errorResponse.status) {
      case 401: // Unauthorized
        printerror = 'Mot de passe ou identifiant invalide';
        this.token.signOut();
        this.route.navigate(['']);
        break;
      case 503: // Service Unavailable
        printerror = '503 ';
        break;
      case 500: // Internal Server 
        printerror = 'Erreur interne du serveur';
        break;
      case 504:
        printerror = 'Serveur API erreur';
        break;
      default:
        printerror = errorResponse.message;
    }

    return throwError(() => new Error(printerror));
  }

  private handleRequestCompleted(): void {
    this.completedRequest++;
    //  console.log("completed request:" + this.completedRequest + "/" + this.completedRequest);
    if (this.completedRequest === this.totalrequest) {
      this.loaderService.isLoading.next(false);
      this.completedRequest = 0;
      this.totalrequest = 0;
    }
    //  console.log(`Request finished`);
  }

  logout() {
      this.token.signOut();
      this.route.navigate(['']);
  }
}
