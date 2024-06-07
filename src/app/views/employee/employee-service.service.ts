import { Injectable } from '@angular/core';
import { dataDummyEmployeeLimit } from 'src/assets/data/dataEmployee';
import { dataDummyEmployee } from 'src/assets/data/dataEmployee';
import { dataEmployeeInterface } from 'src/app/interface/employee-interface'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor() { }
  data = []
  dataEmployee = new BehaviorSubject<dataEmployeeInterface[]>(this.data);
  paginationEmployee = new BehaviorSubject<number[]>([]);

  actionDataEmployee(start:number = 0, end:number = 10){
    this.dataEmployee.next(dataDummyEmployeeLimit.slice(start,end));
    this.actionPaginationEmployee()
  } 

  actionPaginationEmployee(){
    const calculatePagination = dataDummyEmployeeLimit?.length / 10
    const parseNumberToArray = Array.from({length: calculatePagination}, (_, i) => i + 1);
    this.paginationEmployee.next(parseNumberToArray)
  }

  getDataEmployee(){
    return this.dataEmployee.asObservable();
  }

  getLengthPaginationEmployee(){
    return this.paginationEmployee.asObservable();
  }
}
