import { DoctorType } from "./doctor-type";

export interface PatientType{
    id?: Number;
    name: string;
    email: string;
    disease: string;
    initialCheckupDate: Date;
    nextCheckupDate: Date;
    medicine: string;
    doctor?: DoctorType;
}