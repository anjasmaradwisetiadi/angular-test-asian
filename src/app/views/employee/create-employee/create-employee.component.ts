import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators,} from '@angular/forms';
import { dataEmployeeInterface } from 'src/app/interface/employee-interface';
import { EmployeeServiceService } from '../employee-service.service';
import Swal from 'sweetalert2';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  
  constructor( 
      private router: Router, 
      private location: Location, 
      private fb: FormBuilder, 
      private employeeService :EmployeeServiceService, 
      private route:ActivatedRoute,
  ) { }

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
  nameRoute = ''; 

  ngOnInit(): void {
     this.nameRoute = this.route.snapshot.url[0].path;
     this.editPatchEmployee()
  }

  editPatchEmployee(){
    if(this.nameRoute === 'edit'){
      const idEmployee = this.route.snapshot.params['id'];
      const dataEmployee = this.employeeService.getDetailEmployee(idEmployee);
        
      this.createOrEditEmployee.patchValue({
        id: dataEmployee.id,
        user_name: dataEmployee.user_name,
        first_name: dataEmployee.first_name,
        last_name: dataEmployee.last_name,
        email: dataEmployee.email,
        birth_date: dataEmployee.birth_date,
        basic_salary: dataEmployee.basic_salary,
        status: dataEmployee.status,
        group: dataEmployee.group,
        description: dataEmployee.description
      });
    }
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
    const timestampId = new Date().getTime();
    this.createOrEditEmployee.patchValue({
      id:String(timestampId),
      birth_date: '644561967'
    })
    const dataEmployee =  this.createOrEditEmployee;
    let employeeSave = this.employeeService.addEmployee('add', dataEmployee.value);
    
    if(employeeSave){
      Swal.fire({
        title: "Success",
        text: "Successfull save data",
        icon: "success"
      }).then((confirm)=>{
        if(confirm){
          this.router.navigate([`/employee`])
        }
      });
    }
  }

  onCancel(){
    this.location.back();
  }

}
