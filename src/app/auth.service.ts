import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  liveToken: any =  localStorage.getItem('token');
  httpHeaders = this.getHeaders();
  rootUrl: any = 'http://api.openweathermap.org/data/2.5';

  constructor(
    private httpcli: HttpClient,
    public snackBar: MatSnackBar
  ) { }

  getHeaders() {
    return new HttpHeaders({
      Accept: 'application/json'
    });

  }
  getMethod($method: string, paramss: any = null) {
    return this.httpcli.get(this.rootUrl + $method, { headers: this.httpHeaders, params: paramss})
    .pipe(map((response: Response) => {
      const responseData: any = response;
      return responseData;
    }
    ));
  }
  postMethod($method: string, params: any= null) {
    let headerss: any;
    if (localStorage.getItem('token')) {
      headerss = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        Accept: 'application/json'
      });
    } else {
      headerss = new HttpHeaders({
        Accept: 'application/json'
      });
    }
    return this.httpcli.post(this.rootUrl + $method, params, {headers: headerss})
    .pipe(map((response: Response) => {
      const responseData: any = response;
      return responseData;
    }
    ));
  }
  showSnackbar(msg, status = null) {
    let panelClassName: string = null;
    if (status === 'error') {
      panelClassName = 'error-snackbar';
    } else if (status === 'success') {
      panelClassName = 'success-snackbar';
    } else if (status === 'warning') {
      panelClassName = 'warning-snackbar';
    } else {
      panelClassName = 'info-snackbar';
    }
    this.snackBar.open(msg, 'Close', {
      verticalPosition: 'top',
      panelClass: [panelClassName]
    });
  }
}
