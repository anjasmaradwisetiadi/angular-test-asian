import { Component, OnInit, OnDestroy } from '@angular/core';
import { dataUser } from 'src/assets/data/dataUser';
import {   
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { dataEmployeeInterface } from 'src/app/interface/employee-interface';
import { EmployeeServiceService } from '../employee-service.service';
import { SubSink } from 'subsink';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  constructor(private employeeService:EmployeeServiceService, private router: Router, private location:Location) { }
  private subs = new SubSink;
  dataEmployee:dataEmployeeInterface[] = [];
  lengthPagination:[] = [];

  ngOnInit(): void {
    this.employeeService.actionDataEmployee(0,10);
    this.subs.sink = this.employeeService.getDataEmployee().subscribe((data: dataEmployeeInterface[])=>{
      this.dataEmployee=data
    })

    this.subs.sink = this.employeeService.getLengthPaginationEmployee().subscribe((data: any)=>{
      this.lengthPagination = data
    })
  }
  onCreate(){
    this.router.navigate(['/employee/create'])
  }

  onDetail(id:string){
    this.router.navigate(['/employee/detail/'+id])
  }

  onEdit(){
    this.router.navigate(['/employee/edit/45'])
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
