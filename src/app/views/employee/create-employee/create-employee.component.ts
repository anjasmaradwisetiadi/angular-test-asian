import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators,} from '@angular/forms';
import { dataEmployeeInterface } from 'src/app/interface/employee-interface';
import { EmployeeServiceService } from '../employee-service.service';
import { dataDummyGroup } from 'src/assets/data/dataEmployee';
import Swal from 'sweetalert2';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc.js';
import * as timezone from 'dayjs/plugin/timezone.js';
import { utilize } from 'src/app/utilize';


const today = new Date();

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
    birth_date: [''],
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
  // maxDate = new Date(2024, 0, 30);
  maxDate = new Date();
  useDate = new Date();
  dataEmployee:dataEmployeeInterface | null = null;

  people$ = dataDummyGroup;
  selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';

  ngOnInit(): void {
     this.nameRoute = this.route.snapshot.url[0].path;
     this.editPatchEmployee();
  }

  getDateNow(from:string = 'create'){
    const data = dayjs();
    const day = Number(data.format('D'));
    const month = (Number(data.format('M')) - 1);
    const year = Number(data.format('YYYY')); 
    this.maxDate = new Date(year, month, day);

    if(from === 'create'){
      this.useDate = this.maxDate;
    } else {
      const convertToEpoch:any =  this.createOrEditEmployee.controls.birth_date.value ? Number(this.createOrEditEmployee.controls.birth_date.value): '';

      const dateTime = utilize.convertTimeDate(convertToEpoch);
      const data = dayjs(dateTime)
      const day = Number(data.format('D'));
      const month = (Number(data.format('M')) - 1);
      const year = Number(data.format('YYYY')); 
      this.useDate = new Date(year, month, day);
    }
  }

  editPatchEmployee(){
    if(this.nameRoute === 'edit'){
      const idEmployee = this.route.snapshot.params['id'];
      this.dataEmployee = this.employeeService.getDetailEmployee(idEmployee);
      
      this.createOrEditEmployee.patchValue({
        id: this.dataEmployee?.id,
        user_name: this.dataEmployee?.user_name,
        first_name: this.dataEmployee?.first_name,
        last_name: this.dataEmployee?.last_name,
        email: this.dataEmployee?.email,
        birth_date: this.dataEmployee?.birth_date,
        basic_salary: Number(this.dataEmployee?.basic_salary),
        status: this.dataEmployee?.status,
        group: this.dataEmployee?.group,
        description: this.dataEmployee?.description
      });
      this.getDateNow('edit');
    } else {
      this.getDateNow();
    }
  }

  transformBasicSalary($event:Event){
    const variable = $event.target as HTMLInputElement; 
    variable.value = variable.value.replace(/[^0-9]/g, '');
    return variable.value
  }

  payloadForm(){
    this.createOrEditEmployee.patchValue({
      id: "",
      user_name: 'Anjasmara Dwi S',
      first_name: 'Anjasmara ',
      last_name: 'Dwi S',
      email: 'anjasmra@gamil.com',
      basic_salary: 4000,
      status: 'active',
      group: 'C',
      description: 'testing payload'
    });
  }

  onSubmit(){
    let employeeSave;
    const timestampId = new Date().getTime();
    dayjs.extend(utc);
    dayjs.extend(timezone);

    if(this.nameRoute === 'edit'){
      const dataTime = dayjs(this.useDate).valueOf();
      this.createOrEditEmployee.patchValue({
        birth_date: String(dataTime)
      })
    } else {
      const dataTime = dayjs(this.useDate).valueOf();
      this.createOrEditEmployee.patchValue({
        id:String(timestampId),
        birth_date: String(dataTime)
      })
    }

    const dataEmployee =  this.createOrEditEmployee;
    if(this.nameRoute === 'edit'){
      employeeSave = this.employeeService.addEmployee('edit', dataEmployee.value);
    } else{
      employeeSave = this.employeeService.addEmployee('add', dataEmployee.value);
    }
    
    if(employeeSave){
      Swal.fire({
        title: "Success",
        text: "Successfull save data",
        icon: "success",
        confirmButtonColor: "#0d6efd",
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
