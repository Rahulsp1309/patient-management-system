import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequestObj, AuthResponseObj } from '../data-structure/AuthObjects';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public login(authReq : AuthRequestObj): Observable<AuthResponseObj> {
    const url = 'http://localhost:8000/api/auth/authenticate';
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
