import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from '../services/doctor-service.service';
import { PrescriptionRequest } from '../data-structure/PrescriptionRequest';

@Component({
  selector: 'app-add-prescription-dialog',
  templateUrl: './add-prescription-dialog.component.html',
  styleUrls: ['./add-prescription-dialog.component.css']
})
export class AddPrescriptionDialogComponent {
  medicines: string[];
  patientID: string;
  dosages!: string[];
  medicineDosageMap: Map<string, string> = new Map<string, string>();
  prescriptionObj!: PrescriptionRequest;

  constructor(
    public dialogRef: MatDialogRef<AddPrescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { medicines: string[], patId: string },
    public doctorService: DoctorService) {
    this.medicines = data.medicines;
    this.patientID = data.patId;
    console.log(this.medicines);
    this.dosages = new Array(this.medicines.length).fill('');
  }

  onClick() {
    this.createPrescriptionObject();
    console.log("pres obj", this.prescriptionObj);
    this.doctorService.sendPrescription(this.prescriptionObj).subscribe((res) => {
      this.dialogRef.close();
      alert("Prescription Sent Successfully!!");
    });
  }

  createPrescriptionObject() {
    for (let i = 0; i < this.medicines.length; i++) {
      this.medicineDosageMap.set(this.medicines[i], this.dosages[i]);
    }
    const medicineDosageMap: { [key: string]: string } = {};
    this.medicineDosageMap.forEach((val: string, key: string) => {
      medicineDosageMap[key] = val;
    });
    this.prescriptionObj = { patientId: this.patientID, dosage: medicineDosageMap };
  }

  cancel() {
    this.dialogRef.close();
  }
}
