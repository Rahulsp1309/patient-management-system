import { Component, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { AddPatientDialogComponent } from '../add-patient-dialog/add-patient-dialog.component';
import { PatientType } from '../data-structure/patient-type';
import { PatientService } from '../services/patient-service.service';
import { DoctorService } from '../services/doctor-service.service';
import { DoctorType } from '../data-structure/doctor-type';
import { MatTableDataSource } from '@angular/material/table';
import { QueryParamType } from '../data-structure/queryParamType';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NumberInput } from '@angular/cdk/coercion';
import { PatientApiResponse } from '../data-structure/PatientApiResponse';
import { SelectionModel } from '@angular/cdk/collections';
import { AddPrescriptionDialogComponent } from '../add-prescription-dialog/add-prescription-dialog.component';

@Component({
  selector: 'app-patients-view',
  templateUrl: './patients-view.component.html',
  styleUrls: ['./patients-view.component.css']
})
export class PatientsViewComponent implements OnInit, AfterViewInit{
  doctorName! : string;
  doctorId!: string;
  displayedColumns: string[] = ['select','name', 'disease', 'medicine', 'initialCheckupDate', 'nextCheckupDate','edit'];
  patientsList = new MatTableDataSource<PatientType>([]);
  pageSize = 20;
  pageIndex = 0;
  totalItems = 0;
  queryParams: QueryParamType= {pageSize : 5 , pageIndex: 0};
  selection = new SelectionModel<PatientType>(true,[]);
  medicines!: string[];

  @ViewChild('paginator') paginator!: MatPaginator;
  constructor(public route: ActivatedRoute, public dialog: MatDialog, public patientService: PatientService, public doctorService: DoctorService){

  }
  ngAfterViewInit(): void {
    this.patientsList.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.doctorId = params['doctorId'];
      console.log('Doctor ID:', this.doctorId);
    });
   this.getDoctorData(); 
  this.getPatientData();
  }
 
  getDoctorData() {
    this.doctorService.getDoctorData(this.doctorId).subscribe((res: DoctorType)=>{
      this.doctorName = res.name;
    })
  }

  getPatientData(){
    this.patientService.getPatientsByDocId(this.doctorId, this.pageIndex, this.pageSize).subscribe((res: PatientApiResponse)=>{
        this.patientsList.data = res.patients;
        this.totalItems = res.count;
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
    console.log("id from edit", id);
    const dialogRef = this.dialog.open(AddPatientDialogComponent, {
      data: {id: this.doctorId, type: "Edit", patId: id},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPatientData();
            console.log('The dialog was closed');
    });
  }

  openPrescriptionDialog(id : string){

    this.medicines = this.patientsList.data
    .filter((patient: PatientType) => {
        return String(patient.id) == id;
    })
    .flatMap((patient: PatientType) => {
        return patient.medicine.split(",");
    });

    console.log("medicines array", this.medicines);
    const dialogRef = this.dialog.open(AddPrescriptionDialogComponent, {
      data: {medicines: this.medicines, patId: id},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPatientData();
            console.log('The dialog was closed');
    });
  }

  handlePageEvent(e : PageEvent){
      this.pageIndex = e.pageIndex;
      this.pageSize = e.pageSize; 
      this.getPatientData();

  }

  toggleAllRows(){
    this.isAllSelected() ? this.selection.clear() : this.selection.select(...this.patientsList.data);
  }

  isAllSelected() {
    return this.selection.selected.length === this.patientsList.data.length;
  }
  
  sendEmail() {
    console.log("send mail called");
    this.doctorService.sendEmail(this.doctorId).subscribe((res)=>{
      alert("Mails Sent Successfully!!");
    });
   }
}
