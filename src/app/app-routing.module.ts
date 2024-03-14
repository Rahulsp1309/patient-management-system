import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PatientsViewComponent } from './patients-view/patients-view.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'patients',
        children:[
         { path: ':doctorId', component: PatientsViewComponent }
        ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
