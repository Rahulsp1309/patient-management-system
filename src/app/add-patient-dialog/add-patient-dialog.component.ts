import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService } from '../services/patient-service.service';
import { PatientType } from '../data-structure/patient-type';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-patient-dialog',
  templateUrl: './add-patient-dialog.component.html',
  styleUrls: ['./add-patient-dialog.component.css']
})
export class AddPatientDialogComponent implements OnInit {
  name!: string;
  email!: string;
  disease!: string;
  initialCheckupDate!: Date;
  nextCheckupDate!: Date;
  patientObj!: PatientType;
  docId!: Number;
  actionType!: string;
  patientId!: string;
  medicines: string[]= [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  announcer = inject(LiveAnnouncer);

  constructor(
    public dialogRef: MatDialogRef<AddPatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: Number, type: string, patId: string },
    public patientService: PatientService) {
    this.patientObj = {} as PatientType;
    this.docId = data.id;
    this.actionType = data.type;
    this.patientId = data.patId;
  }

  ngOnInit(): void {
    this.loadPatientData();
  }

  loadPatientData(){
    if (this.patientId) {
      this.patientService.getPatientById(this.patientId).subscribe((res: PatientType) => {
        this.name = res.name;
        this.email = res.email;
        this.medicines = res.medicine.split(",");
        this.disease = res.disease;
        this.initialCheckupDate = res.initialCheckupDate;
        this.nextCheckupDate = res.nextCheckupDate;
      });
    }
  }

  formatDate(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  onClick() {
    if (this.actionType === 'Add') {
      this.createPatientRequestObject();
      this.patientService.savePatient(this.patientObj, this.docId).subscribe((response: any) => {
        this.dialogRef.close();
      })
    }

    if (this.actionType === 'Edit') {
      this.createPatientRequestObject();
      this.patientService.updatePatientById(this.patientObj, this.patientId).subscribe((response: any) => {
        this.dialogRef.close();
        this.loadPatientData();
      })

    }

  }

 createPatientRequestObject() {
    this.patientObj = {
      name: this.name,
      email: this.email,
      disease: this.disease,
      initialCheckupDate: this.initialCheckupDate,
      nextCheckupDate: this.nextCheckupDate,
      medicine: this.medicines.toString()
    }
  }

  checkAllInputs() {
    return !!this.name &&  !!this.disease && !!this.initialCheckupDate && !!this.nextCheckupDate;
  }

  cancel() {
    this.dialogRef.close();
  }

  addChip(event: MatChipInputEvent): void {
    console.log("inside addchip")
    const value = (event.value || '').trim();
    if (value) {
      this.medicines?.push(value);
    }
    event.chipInput!.clear();
  }

  removeChip(medicine: string): void {
    const index = this.medicines.indexOf(medicine);

    if (index >= 0) {
      this.medicines.splice(index, 1);

      this.announcer.announce(`Removed ${medicine}`);
    }
  }
}
