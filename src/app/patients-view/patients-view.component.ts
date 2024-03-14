import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { AddPatientDialogComponent } from '../add-patient-dialog/add-patient-dialog.component';
import { PatientType } from '../data-structure/patient-type';
import { PatientService } from '../services/patient-service.service';

@Component({
  selector: 'app-patients-view',
  templateUrl: './patients-view.component.html',
  styleUrls: ['./patients-view.component.css']
})
export class PatientsViewComponent implements OnInit  {
  doctorId!: string;
  patientsList!: PatientType[];
  displayedColumns: string[] = ['name', 'disease', 'medicine', 'initialCheckupDate', 'nextCheckupDate','edit'];

  constructor(public route: ActivatedRoute, public dialog: MatDialog, public patientService: PatientService){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.doctorId = params['doctorId'];
      console.log('Doctor ID:', this.doctorId);
    });

    this.getPatientData();
  }

  getPatientData(){
      this.patientService.getPatientsByDocId(this.doctorId).subscribe((res: any)=>{
        this.patientsList = res;
      })
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddPatientDialogComponent, {
      data: {id: this.doctorId, type: "Add", patId: null},
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openEditDialog(id : string){
    const dialogRef = this.dialog.open(AddPatientDialogComponent, {
      data: {id: this.doctorId, type: "Edit", patId: id},
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

}
