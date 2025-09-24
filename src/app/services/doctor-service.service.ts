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
import { PrescriptionRequest } from '../data-structure/PrescriptionRequest';
import {DEV_HOST_URL, LOCAL_HOST_URL, DEV_HOST_AZURE_URL} from './api-urls';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  currURL = DEV_HOST_URL;
  constructor(private http: HttpClient) { }
 
  public getDoctorData(id : string): Observable<DoctorType> {
    const url = this.currURL+'/api/doctor/getDoctorById/'+id;
    return this.http.get<DoctorType>(url);
  }

  public registerDoctor(user: DoctorType): Observable<AuthResponseObj> {
    const url = this.currURL+'/api/auth/register';
    return this.http.post<AuthResponseObj>(url, user);
  }

  public checkUserName(email: string): Observable<Boolean> {
    const url = this.currURL+'/api/doctor/check-username/' + email;
    return this.http.get<Boolean>(url);
  }

  public sendEmail(id : string): Observable<void> {
    console.log("mail service", id);
    const url = this.currURL+'/api/doctor/sendMailById/' + id;
    return this.http.post<void>(url, null);
  }

  public sendPrescription(prescriptionObj : PrescriptionRequest): Observable<void>{
    console.log("inside doctor service", prescriptionObj);
    const url = this.currURL+'/api/doctor/sendMailWithPrescription';
    return this.http.post<void>(url, prescriptionObj);
  }

}
