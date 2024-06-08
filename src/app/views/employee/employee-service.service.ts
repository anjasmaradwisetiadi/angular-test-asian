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
  dataEmployeeAll = dataDummyEmployeeLimit; 
  detailEmployee:dataEmployeeInterface[]=[]; 
  dataEmployee = new BehaviorSubject<dataEmployeeInterface[]>(this.data);
  paginationEmployee = new BehaviorSubject<number[]>([]);

  actionDataEmployee(start:number = 0, end:number = 10){
    this.dataEmployee.next(this.dataEmployeeAll.slice(start,end));
    this.actionPaginationEmployee()
  } 

  actionPaginationEmployee(){
    const calculatePagination = this.dataEmployeeAll?.length / 10
    const parseNumberToArray = Array.from({length: calculatePagination}, (_, i) => i + 1);
    this.paginationEmployee.next(parseNumberToArray)
  }

  getDetailEmployee(id: string){
    this.detailEmployee = this.dataEmployeeAll.filter((data:dataEmployeeInterface)=>{
      return data.id === id;
    })
    return this.detailEmployee[0]
  }

  getDataEmployee(){
    return this.dataEmployee.asObservable();
  }

  getLengthPaginationEmployee(){
    return this.paginationEmployee.asObservable();
  }
}
