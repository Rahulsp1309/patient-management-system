import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { AddPatientDialogComponent } from '../add-patient-dialog/add-patient-dialog.component';
import { PatientType } from '../data-structure/patient-type';
import { PatientService } from '../services/patient-service.service';
import { DoctorService } from '../services/doctor-service.service';
import { DoctorType } from '../data-structure/doctor-type';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-patients-view',
  templateUrl: './patients-view.component.html',
  styleUrls: ['./patients-view.component.css']
})
export class PatientsViewComponent implements OnInit  {
  doctorName! : string;
  doctorId!: string;
  displayedColumns: string[] = ['name', 'disease', 'medicine', 'initialCheckupDate', 'nextCheckupDate','edit'];
  patientsList = new MatTableDataSource<PatientType>([]);

  constructor(public route: ActivatedRoute, public dialog: MatDialog, public patientService: PatientService, public doctorService: DoctorService){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.doctorId = params['doctorId'];
      console.log('Doctor ID:', this.doctorId);
    });
    this.getDoctorData();
    this.getPatientData();
  }

  getDoctorData(){
      this.doctorService.getDoctorData(this.doctorId).subscribe((res: DoctorType)=>{
        this.doctorName = res.name;
      })
  }

  getPatientData(){
      this.patientService.getPatientsByDocId(this.doctorId).subscribe((res: any)=>{
        this.patientsList.data = res;
      })
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddPatientDialogComponent, {
      data: {id: this.doctorId, type: "Add", patId: null},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPatientData();
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
