import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from '../employee-service.service';
import { dataEmployeeInterface } from 'src/app/interface/employee-interface';
import { Location } from '@angular/common'
import { utilize } from 'src/app/utilize';
import Swal from 'sweetalert2';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.css']
})
export class DetailEmployeeComponent implements OnInit, OnDestroy {
  private subs = new SubSink;

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

  paramIdEmployee = ''

  ngOnInit(): void {
    this.paramIdEmployee = this.route.snapshot.params['id'];
    this.detailEmployee = this.employeeService.getDetailEmployee(this.paramIdEmployee)   
  }

  onEdit(){
    this.router.navigate(['/employee/edit/'+id])
  }

  onDelete(){
    Swal.fire({
      title: "Are you sure delete data?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) =>{
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(this.paramIdEmployee);
        Swal.fire({
          title: "Deleted!",
          text: "Your data has been deleted.",
          icon: "success"
        }).then((result)=>{
          if(result.isConfirmed){
            this.router.navigate(['/employee'])
          }
        })
      }
    })
  }
  onBack(){
    this.location.back();
  }

  transformBasicSalary(data:number){
    return utilize.formatIDR(data)
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
