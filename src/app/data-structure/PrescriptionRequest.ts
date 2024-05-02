export interface PrescriptionRequest{
    patientId: string;
    dosage: {[key: string]: string};
}