import { DoctorType } from "./doctor-type";

export interface AuthRequestObj{
    email: string;
    password: string;
}

export interface AuthResponseObj{
    doctor: DoctorType;
    token: string;
}