import { Component, OnInit, OnDestroy, ViewChild, } from '@angular/core';
import { MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {   
  Router,
} from '@angular/router';
import { dataEmployeeInterface, dataSortingAndFilterInterface } from 'src/app/interface/employee-interface';
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
  basicSalaryFilter: any = null;

  constructor(private employeeService:EmployeeServiceService, private router: Router, private location:Location) { }
  displayedColumns: string[] = ['user_name', 'email', 'status', 'basic_salary', 'action'];
  dataSource: MatTableDataSource<dataEmployeeInterface>;

  private subs = new SubSink;
  dataEmployee:dataEmployeeInterface[] = [];
  lengthPagination:number = 0;
  startPaginate = 0;
  endPaginate = 0;
  pageSize = 25;
  lengthData = 0;
  sortValue = {};
  isSorting = false;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.setAndCheckLocalStorage();
    this.getDataEmployee();
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
          icon: "success",
          confirmButtonColor: "#0d6efd",
        });
      }
    })
  }

  onlyNumber($event:Event){
    const variable = $event.target as HTMLInputElement; 
    variable.value = variable.value.replace(/[^0-9.]/g, '');
    this.basicSalaryFilter = Number(variable.value);
    return variable.value = variable.value;
  }

  transformBasicSalary(data:number){
    return utilize.formatIDR(Number(data))
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
    let payload;
    //********* */ reset pagination
    this.dataSource.data = [];
    this.paginator.pageSize = this.pageSize;
    this.paginator.length = 0;
    this.paginator.firstPage();
    //********* */ end reset pagination
    payload = {
      user_name: this.usernameFilter,
      email: this.emailFilter,
      status: this.statusFilter,
      basic_salary: this.basicSalaryFilter
    }
    this.employeeService.actionFilterEmployee(payload, this.sortValue);
    this.dataSource.paginator = this.paginator;
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
  }

  applyReset(){
    this.usernameFilter = '';
    this.emailFilter = '';
    this.statusFilter = '';
    this.basicSalaryFilter = null;
    (document.querySelector('#basic_salary')as HTMLInputElement).value = null;
    this.pageSize = 10;
    this.sortValue = null;
    this.sort.sort({ id: '', start: 'asc', disableClear: false });
    this.applyFilterOn();
  }

  sortData($event: Sort){
    this.sortValue = $event.active ? { [$event.active]: $event.direction ? $event.direction : `asc` } : null;
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
      (document.querySelector('#basic_salary')as HTMLInputElement).value = this.basicSalaryFilter;
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
