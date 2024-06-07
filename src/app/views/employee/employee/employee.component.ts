import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/service/authService/auth.service';
import { AuthGuardService } from 'src/app/service/authService/auth-guard.service';
import { dataUser } from 'src/assets/data/dataUser';
import { dataEmployeeInterface } from 'src/app/interface/employee-interface';
import { EmployeeServiceService } from '../employee-service.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  constructor(private employeeService:EmployeeServiceService) { }
  private subs = new SubSink;
  dataEmployee:dataEmployeeInterface[] = [];
  lengthPagination:[] = [];

  ngOnInit(): void {
    this.subs.sink = this.employeeService.getDataEmployee().subscribe((data: dataEmployeeInterface[])=>{
      this.dataEmployee=data
    })

    this.subs.sink = this.employeeService.getLengthPaginationEmployee().subscribe((data: any)=>{
      this.lengthPagination = data
    })
  }

  onDetail(){
    console.log('detail');
  }

  onEdit(){
    console.log('edit');
  }

  onDelete(){
    console.log('delete');
  }

  applyFilter(){
    console.log('applyFilter');
  }

  applyReset(){
    console.log('applyReset');
  }

  ngOnDestroy(): void {
      this.subs.unsubscribe();
  }


}
