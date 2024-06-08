import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from '../employee-service.service';
import { dataEmployeeInterface } from 'src/app/interface/employee-interface';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.css']
})
export class DetailEmployeeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute ,private employeeService: EmployeeServiceService) { 
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


}
