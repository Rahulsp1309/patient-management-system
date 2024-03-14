import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';
import { DoctorService } from '../services/doctor-service.service';
import { Router } from '@angular/router';
import { DoctorType } from '../data-structure/doctor-type';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {

  userName!: string;
  password!: string;
  showSpinner!: boolean;
  doctor!: DoctorType;

  constructor(public dialog: MatDialog, public doctorService: DoctorService, public router: Router) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(SignUpDialogComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  login() {
    this.doctor = { userName: this.userName, password: this.password } as DoctorType;

    this.doctorService.checkUser(this.userName, this.password).subscribe((data) => {
      console.log("data-->", data);
      if (data) {
        const doctorID = data;
        this.router.navigate(['/', 'patients', `${doctorID}`]);
      }
      else alert("User not found");
    })

  }

}

