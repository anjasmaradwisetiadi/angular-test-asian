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
import Swal from 'sweetalert2';

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
      this.dataEmployee= data
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

  onEdit(id:string){
    this.router.navigate(['/employee/edit/'+id])
  }

  onDelete(id: string){
    Swal.fire({
      title: "Are you sure delete data?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) =>{
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id);
        this.subs.sink = this.employeeService.getDataEmployee().subscribe((data: dataEmployeeInterface[])=>{
          this.dataEmployee=data
        })
        Swal.fire({
          title: "Deleted!",
          text: "Your data has been deleted.",
          icon: "success"
        });
      }
    })
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
