import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from '../services/doctor-service.service';
import { DoctorType } from '../data-structure/doctor-type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.css']
})
export class SignUpDialogComponent {
  userName!: string;
  password!: string;
  name!: string;
  speciality!: string;
  experience!: Number;
  doctorRequestObject!: DoctorType;
  isUserPresent!: Boolean;

  constructor(
    public dialogRef: MatDialogRef<SignUpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public doctorService: DoctorService
  ) {
    this.doctorRequestObject = {} as DoctorType;
  }


  onClick() {
    this.checkIfAlreadyExists().then((response) => {
      response.subscribe((data) => {
        if (data) {
          alert("username already exists");
        }
        else {
          this.createRequestObject();
          this.doctorService.saveUser(this.doctorRequestObject).subscribe((response: any) => {
            this.dialogRef.close();

          });
        }
      })

    })
  }

  cancel() {
    this.dialogRef.close();
  }

  createRequestObject(): DoctorType {
    this.doctorRequestObject = {
      name: this.name,
      userName: this.userName,
      password: this.password,
      speciality: this.speciality,
      experience: this.experience,
    }

    return this.doctorRequestObject;
  }

  async checkIfAlreadyExists(): Promise<Observable<Boolean>> {
    return await this.doctorService.checkUserName(this.userName);
  }

}
