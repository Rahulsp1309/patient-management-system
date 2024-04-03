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
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;
  queryParams: QueryParamType= {pageSize : 5 , pageIndex: 0};
  selection = new SelectionModel<PatientType>(true,[]);

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
  this.getPatientData();
  }


  getPatientData(){
    this.patientService.getPatientsByDocId(this.doctorId, this.pageIndex, this.pageSize).subscribe((res: PatientApiResponse)=>{
      this.doctorName = res?.patients[0].doctor?.name as string;
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
    const dialogRef = this.dialog.open(AddPatientDialogComponent, {
      data: {id: this.doctorId, type: "Edit", patId: id},
    });

    dialogRef.afterClosed().subscribe(() => {
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

}
