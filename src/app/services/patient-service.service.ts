import { PatientType } from '../data-structure/patient-type';
import {
  HttpClient,
  HttpEvent,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  public savePatient(patient: PatientType, id: Number): Observable<PatientType> {
    const url = 'http://localhost:8000/patient/create-patient/'+id;
    return this.http.post<any>(url, patient);
  }

  public getPatientsByDocId(id: string): Observable<PatientType[]>{
    const url = 'http://localhost:8000/patient/getByDoctorId/'+id;
    return this.http.get<any>(url);
  }

  public getPatientById(id: string): Observable<PatientType>{
    const url = 'http://localhost:8000/patient/getById/'+id;
    return this.http.get<any>(url);
  }

  public updatePatientById(patient: PatientType , id : string): Observable<PatientType>{
    const url = 'http://localhost:8000/patient/update/' + id ;
    return this.http.put<any>(url, patient);
  }

}
