import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private auth: AuthenticationService, private http: HttpClient) { }

  readonly ROOT_URL = 'https://playstack.azurewebsites.net';

  getSiguiendo() {
    let user = this.auth.getUserName();
    let params = new HttpParams().set('Usuario', user);
    return this.http.get(this.ROOT_URL + '/user/get/following', { params });
  }

  getSeguidores() {
    let user = this.auth.getUserName();
    let params = new HttpParams().set('Usuario', user);
    return this.http.get(this.ROOT_URL + '/user/get/followers', { params });
  }

  getSolicitudes() {
    let user = this.auth.getUserName();
    let params = new HttpParams().set('Usuario', user);
    return this.http.get(this.ROOT_URL + '/user/get/followrequests', { params });
  }
}
