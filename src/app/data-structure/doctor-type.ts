import { PatientType } from "./patient-type";

export interface DoctorType{
    id?: Number;
    name: string;
    email: string;
    password: string;
    speciality: string;
    experience: Number;
    patients?: PatientType[]
}