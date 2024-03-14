import { DoctorType } from "./doctor-type";

export interface PatientType{
    id?: Number;
    name: string;
    disease: string;
    initialCheckupDate: Date;
    nextCheckupDate: Date;
    medicine: string;
    doctor?: DoctorType;
}