import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, } from '@angular/core';
import { dataUser } from 'src/assets/data/dataUser';
import { MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
import { utilize } from 'src/app/utilize';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  usernameFilter = "";
  emailFilter = "";
  statusFilter = "";
  basicSalaryFilter: number|null = 0;

  constructor(private employeeService:EmployeeServiceService, private router: Router, private location:Location) { }
  displayedColumns: string[] = ['user_name', 'email', 'status', 'basic_salary', 'action'];
  dataSource: MatTableDataSource<dataEmployeeInterface>;

  private subs = new SubSink;
  dataEmployee:dataEmployeeInterface[] = [];
  lengthPagination:number = 0;
  startPaginate = 0;
  endPaginate = 0;
  pageSize = 10;
  lengthData = 0;
  sortValue = {};

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort| any;

  ngOnInit(): void {
    this.employeeService.actionDataEmployee(0,100);
    this.getData();
  }

  getData(){
    this.subs.sink = this.employeeService.getDataEmployee().subscribe((data: dataEmployeeInterface[])=>{
      this.lengthData = data.length;
      this.dataSource = new MatTableDataSource(data);
    })

    this.subs.sink = this.employeeService.getLengthPaginationEmployee().subscribe((data: number)=>{
      this.lengthPagination = data
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  handlePageEvent($event: PageEvent){
    this.startPaginate = $event.pageIndex * $event.pageSize
    this.endPaginate = ($event.pageIndex+1) * $event.pageSize
    this.employeeService.actionDataEmployee(this.startPaginate, this.endPaginate);
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
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#0d6efd",
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

  transformBasicSalary(data:number){
    return utilize.formatIDR(data)
  }

  payloadFilter(){
    return{
      user_name: this.usernameFilter,
      email: this.emailFilter,
      status: this.statusFilter,
      basic_salary: this.basicSalaryFilter
    }
  }

  applyFilterOn(){
    //********* */ reset pagination
    this.paginator.firstPage();
    this.pageSize = 10;
    //********* */ end reset pagination
    const payload = {
      user_name: this.usernameFilter,
      email: this.emailFilter,
      status: this.statusFilter,
      basic_salary: this.basicSalaryFilter
    }
    this.employeeService.actionFilterEmployee(payload, this.sortValue);
  }

  applyReset(){
    this.usernameFilter = '';
    this.emailFilter = '';
    this.statusFilter = '';
    this.basicSalaryFilter = 0;
    this.paginator.firstPage();
    this.pageSize = 10;
    this.employeeService.actionDataEmployee(0,100);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sortValue = {};
    this.applyFilterOn();
  }

  sortData($event: Sort){
    this.sortValue = $event.active ? { [$event.active]: $event.direction ? $event.direction : `asc` } : null;
    this.applyFilterOn()
  }

  ngOnDestroy(): void {
      this.subs.unsubscribe();
  }


}
