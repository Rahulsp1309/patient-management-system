import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService } from '../services/patient-service.service';
import { PatientType } from '../data-structure/patient-type';

@Component({
  selector: 'app-add-patient-dialog',
  templateUrl: './add-patient-dialog.component.html',
  styleUrls: ['./add-patient-dialog.component.css']
})
export class AddPatientDialogComponent implements OnInit{
  name!: string;
  disease!: string;
  medicine!: string;
  initialCheckupDate!: Date;
  nextCheckupDate!: Date;
  patientObj!: PatientType;
  docId!: Number;
  actionType!: string;
  patientId!: string;

  constructor(
    public dialogRef: MatDialogRef<AddPatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: Number, type: string, patId : string},
    public patientService: PatientService) {
      this.patientObj= {} as PatientType;
      this.docId = data.id;
      this.actionType = data.type;
      this.patientId = data.patId;
  }

  ngOnInit(): void {

      if(this.patientId){
        this.patientService.getPatientById(this.patientId).subscribe((res: PatientType)=>{
            this.name = res.name;
            this.medicine = res.medicine;
            this.disease = res.disease;
            this.initialCheckupDate = res.initialCheckupDate;
            this.nextCheckupDate = res.nextCheckupDate;
        });
      }
  }

  formatDate(date: Date): string{
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  onClick() {
    if(this.actionType === 'Add'){
      this.createPatientRequestObject();
      this.patientService.savePatient(this.patientObj, this.docId).subscribe((response: any)=>{
        this.dialogRef.close();
      })
    }

    if(this.actionType === 'Edit'){
      this.createPatientRequestObject();
      this.patientService.updatePatientById(this.patientObj, this.patientId).subscribe((response: any)=>{
        this.dialogRef.close();
      })

    }
    
   }

  
  createPatientRequestObject(){
    this.patientObj = {
      name: this.name,
      disease: this.disease,
      initialCheckupDate: this.initialCheckupDate,
      nextCheckupDate: this.nextCheckupDate,
      medicine: this.medicine,
    }

  }
  cancel(){
    this.dialogRef.close();
  }

}
