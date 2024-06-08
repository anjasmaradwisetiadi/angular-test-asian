import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor( private router: Router, private location: Location ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log('onSubmit');
  }

  onCancel(){
    this.location.back();
  }

}
