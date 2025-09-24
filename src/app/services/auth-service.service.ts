import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequestObj, AuthResponseObj } from '../data-structure/AuthObjects';
import {DEV_HOST_URL, LOCAL_HOST_URL, DEV_HOST_AZURE_URL} from './api-urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //todo- make it dynamic 
  currURL = DEV_HOST_URL;
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public login(authReq : AuthRequestObj): Observable<AuthResponseObj> {
    const url = this.currURL+'/api/auth/authenticate';
    return this.http.post<AuthResponseObj>(url,authReq);
  }

  public setToken(token: string|null){
    this.cookieService.set('jwtToken', String(token));
  }

  public getToken(){
    return this.cookieService.get('jwtToken');
  }

  public logOut(){
    this.cookieService.delete('jwtToken');
  }

  public isLoggedIn(){
    return !!this.getToken();
  }

}
