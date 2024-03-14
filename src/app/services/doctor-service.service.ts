import { Injectable } from '@angular/core';
import { DoctorType } from '../data-structure/doctor-type';
import {
  HttpClient,
  HttpEvent,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private http: HttpClient) { }
 
  public getDoctorData(id : string): Observable<DoctorType> {
    const url = 'http://localhost:8000/doctor/getDoctor/'+id;
    return this.http.get<DoctorType>(url);
  }

  public saveUser(user: DoctorType): Observable<DoctorType> {
    const url = 'http://localhost:8000/doctor/create-doctor';
    return this.http.post<DoctorType>(url, user);
  }

  public checkUser(userName: string, password: string): Observable<BigInteger> {
    const url = 'http://localhost:8000/doctor/checkCredentials/' + userName + `/${password}`;
    return this.http.get<BigInteger>(url);
  }

  public checkUserName(userName: string): Observable<Boolean> {
    const url = 'http://localhost:8000/doctor/checkUserName/' + userName;
    return this.http.get<Boolean>(url);
  }

}
