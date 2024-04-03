import { Injectable } from '@angular/core';
import { DoctorType } from '../data-structure/doctor-type';
import {
  HttpClient,
  HttpEvent,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponseObj } from '../data-structure/AuthObjects';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private http: HttpClient) { }
 
  public getDoctorData(id : string): Observable<DoctorType> {
    const url = 'http://localhost:8000/doctor/getDoctor/'+id;
    return this.http.get<DoctorType>(url);
  }

  public registerDoctor(user: DoctorType): Observable<AuthResponseObj> {
    const url = 'http://localhost:8000/api/auth/register';
    return this.http.post<AuthResponseObj>(url, user);
  }

  public checkUserName(email: string): Observable<Boolean> {
    const url = 'http://localhost:8000/api/doctor/check-username/' + email;
    return this.http.get<Boolean>(url);
  }

}
