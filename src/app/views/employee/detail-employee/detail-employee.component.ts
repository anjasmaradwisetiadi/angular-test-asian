import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from '../employee-service.service';
import { dataEmployeeInterface } from 'src/app/interface/employee-interface';
import { Location } from '@angular/common'
import { utilize } from 'src/app/utilize';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.css']
})
export class DetailEmployeeComponent implements OnInit {

  constructor(
      private router: Router, 
      private route: ActivatedRoute,
      private employeeService: EmployeeServiceService,
      private location:Location
  ) { 
  }

  detailEmployee:dataEmployeeInterface = {
    id: '',
    user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    birth_date: "",
    basic_salary: 0,
    status: "",
    group: "",
    description: ""
  };

  ngOnInit(): void {
    const paramId = this.route.snapshot.params['id'];
    this.detailEmployee = this.employeeService.getDetailEmployee(paramId)   
  }

  onEdit(){
    console.log('on Edit');
  }

  onDelete(){
    console.log('on Delete');
  }
  onBack(){
    this.location.back();
  }

  transformBasicSalary(data:number){
    return utilize.formatIDR(data)
  }

}
