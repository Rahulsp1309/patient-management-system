import { PatientType } from "./patient-type";

export interface PatientApiResponse{
    patients: PatientType[];
    count : number;
}