import { Component, OnInit } from '@angular/core';
import { dataUserInterface } from 'src/app/interface/authInterface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profile:any;
  constructor() { }

  ngOnInit(): void {
    let getProfileUser = localStorage.getItem('user');
    getProfileUser = getProfileUser ? JSON.parse(getProfileUser) : '' 
    this.profile = getProfileUser;
  }

}
