import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() doctorName!: string;

  constructor(public router: Router){}

  logOut(){
    this.router.navigate(['/']);
  }

}
