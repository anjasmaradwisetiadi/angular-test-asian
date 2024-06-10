import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { EmployeeServiceService } from '../employee/employee-service.service';
import { dataEmployeeInterface } from 'src/app/interface/employee-interface';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-table-material',
  templateUrl: './table-material.component.html',
  styleUrls: ['./table-material.component.css']
})
export class TableMaterialComponent implements OnInit, OnDestroy {
  private subs = new SubSink;
  displayedColumns: string[] = ['id', 'user_name', 'email', 'status', 'basic_salary', 'group'];
  dataSource: MatTableDataSource<dataEmployeeInterface>;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort| any;

  constructor(private _liveAnnouncer: LiveAnnouncer, private employeeService:EmployeeServiceService) {

  }
  


  ngOnInit(): void {
    this.employeeService.actionDataEmployee(0,10);
    this.subs.sink = this.employeeService.getDataEmployee().subscribe((data: dataEmployeeInterface[])=>{
      this.dataSource = new MatTableDataSource(data);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log('data');
    console.log(this.paginator);
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log('this.dataSource = ');
    console.log(this.dataSource);
    console.log(this.dataSource.filter)

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDetail(id){
    console.log('data id = ');
    console.log(id);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
