import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';
import { DoctorService } from '../services/doctor-service.service';
import { Router , ActivatedRoute} from '@angular/router';
import { DoctorType } from '../data-structure/doctor-type';
import { AuthRequestObj } from '../data-structure/AuthObjects';
import { AuthService } from '../services/auth-service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit{
   email!: string;
  password!: string;
  showSpinner!: boolean;
  doctor!: DoctorType;
  authReq!: AuthRequestObj;

  constructor(private dialog: MatDialog, private doctorService: DoctorService, private router: Router, private authService: AuthService, private ar: ActivatedRoute) {

   }

  ngOnInit(): void {
    console.log("current -- url", this.router.url);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(SignUpDialogComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  login() {
    this.authReq = { email: this.email, password: this.password };
    this.authService.login(this.authReq).subscribe((data) => {
      if (data) {
        this.authService.setToken(data.token);
        const doctorID = data.doctor.id;
        this.router.navigate(['/', 'patients', `${doctorID}`]);
      }
      else alert("User not found");
    })
  }
}

