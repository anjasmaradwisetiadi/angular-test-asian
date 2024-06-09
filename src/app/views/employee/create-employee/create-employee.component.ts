import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators,} from '@angular/forms';
import { dataEmployeeInterface } from 'src/app/interface/employee-interface';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  
  constructor( private router: Router, private location: Location, private fb: FormBuilder  ) { }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  createOrEditEmployee = this.fb.group({
    id: [''],
    user_name: ['', [Validators.required]],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email:  ['', [Validators.required, Validators.email]],
    birth_date: ['', [Validators.required]],
    basic_salary: [0, [Validators.required]],
    status: ['', [Validators.required]],
    group: ['', [Validators.required]],
    description: ['', [Validators.required]]
  })


  groupName = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J'
  ]

  statusName = [
    'active',
    'inactive'
  ]

  ngOnInit(): void {
  }

  transformBasicSalary($event:Event){
    const variable = $event.target as HTMLInputElement; 
    variable.value = variable.value.replace(/[^0-9.]/g, '');
    return variable.value = Number(parseFloat(variable.value)).toFixed(2)
  }

  payloadForm(){
    this.createOrEditEmployee.patchValue({
      id: "",
      user_name: 'Anjasmara Dwi S',
      first_name: 'Anjasmara ',
      last_name: 'Dwi S',
      email: 'anjasmra@gamil.com',
      birth_date: '164781258281',
      basic_salary: 0,
      status: 'active',
      group: 'C',
      description: 'testing payload'
      });
  }

  onSubmit(){
    this.createOrEditEmployee.patchValue({
      id:'45',
      birth_date: '644561967'
    })
    const dataEmployee =  this.createOrEditEmployee;
    console.log('dataEmployee = ');
    console.log(dataEmployee);
  }

  onCancel(){
    this.location.back();
  }

}
