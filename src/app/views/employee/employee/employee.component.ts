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
import { dataEmployeeInterface, dataSortingAndFilterInterface } from 'src/app/interface/employee-interface';
import { EmployeeServiceService } from '../employee-service.service';
import { SubSink } from 'subsink';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { utilize } from 'src/app/utilize';
import { startWith,tap } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  usernameFilter = "";
  emailFilter = "";
  statusFilter = "";
  basicSalaryFilter: any = null;

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
  isReset = false;


  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort| any;

  ngOnInit(): void {
    this.setAndCheckLocalStorage();
    this.getDataEmployee();
    // this.employeeService.actionDataEmployee(0,100);
  }

  getData(){
    this.subs.sink = this.employeeService.getDataEmployee().subscribe((data: dataEmployeeInterface[])=>{
      // console.log('this.dataSource ? ');
      // console.log(data);
      this.lengthData = data.length;
      this.dataSource = new MatTableDataSource(data);
    })

    this.subs.sink = this.employeeService.getLengthPaginationEmployee().subscribe((data: number)=>{
      this.lengthPagination = data
    })
  }

  ngAfterViewInit() {
    // this.getDataEmployee();
    // this.employeeService.actionDataEmployee(0,10);
    // this.dataSource.paginator = this.paginator
    // .pipe(
    //   startWith(null),
    //   tap(()=>{
    //     if (!this.isReset) {
    //       this.applyFilterOn()
    //     }
    //   }))
    //
    // console.log("this.paginator view init= ")   
    // console.log(this.paginator)
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
          icon: "success",
          confirmButtonColor: "#0d6efd",
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

  getDataEmployee(){
    this.pageSize = 10;
    const payload = {
      user_name: this.usernameFilter,
      email: this.emailFilter,
      status: this.statusFilter,
      basic_salary: this.basicSalaryFilter
    }
    this.employeeService.actionFilterEmployee(payload, this.sortValue);
    this.getData();
  }

  applyFilterOn(){
    //********* */ end reset pagination
    this.dataSource.data = [];
    this.paginator.length = 0;
    this.paginator.firstPage();
    this.pageSize = 10;
        //********* */ reset pagination
    const payload = {
      user_name: this.usernameFilter,
      email: this.emailFilter,
      status: this.statusFilter,
      basic_salary: this.basicSalaryFilter
    }
    // console.log('this.sortValue = ');
    // console.log(this.sortValue);
    this.employeeService.actionFilterEmployee(payload, this.sortValue);
    this.dataSource.paginator = this.paginator;
    // console.log('this.paginator');
    // console.log(this.paginator);
    this.dataSource.sort = this.sort;
    
    // setItemLocalStorage
    const payloadSortFilter = {
      filter:{
        user_name: this.usernameFilter,
        email: this.emailFilter,
        status: this.statusFilter,
        basic_salary: this.basicSalaryFilter,
      },
      sorting: this.sortValue
    }
    localStorage.setItem('sort_and_filter', JSON.stringify(payloadSortFilter))
    this.isReset = false;
  }

  applyReset(){
    this.usernameFilter = '';
    this.emailFilter = '';
    this.statusFilter = '';
    this.basicSalaryFilter = null;
    this.pageSize = 10;
    this.sortValue = null;
    this.sort.sort({ id: '', start: 'asc', disableClear: false });
    this.isReset = true;
    this.applyFilterOn();
  }

  sortData($event: Sort){
    this.sortValue = $event.active ? { [$event.active]: $event.direction ? $event.direction : `asc` } : null;
    this.applyFilterOn()
    this.paginator.pageIndex = 0;
  }

  setAndCheckLocalStorage(){
    let getLocalStorage = localStorage.getItem('sort_and_filter');
    const dataSortingFiltering:dataSortingAndFilterInterface|null = getLocalStorage ? JSON.parse(getLocalStorage) : null;
    if(dataSortingFiltering){
      this.usernameFilter = dataSortingFiltering.filter.user_name;
      this.emailFilter = dataSortingFiltering.filter.email;
      this.statusFilter = dataSortingFiltering.filter.status;
      this.basicSalaryFilter = dataSortingFiltering.filter.basic_salary;
      this.sortValue = dataSortingFiltering.sorting;
    } else {
      const payloadSortFilter = {
        filter:{
          user_name: '',
          email: '',
          status: '',
          basic_salary: null,
        },
        sorting:{}
      }
      localStorage.setItem('sort_and_filter', JSON.stringify(payloadSortFilter))
    }
  }

  ngOnDestroy(): void {
      this.subs.unsubscribe();
  }

}
