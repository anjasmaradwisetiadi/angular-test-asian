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
    this.actionPaginationEmployee();
  } 

  actionPaginationEmployee(){
    const calculatePagination = this.dataEmployeeAll?.length / 10
    const parseNumberToArray = Array.from({length: calculatePagination}, (_, i) => i + 1);
    this.paginationEmployee.next(parseNumberToArray)
  }

  addEmployee(from:string, payload:any) {
    if(from === 'add'){
      return dataDummyEmployeeLimit.unshift(payload);
    } else {
      let indexEdit = 0;
      dataDummyEmployeeLimit.forEach((data:dataEmployeeInterface, index:number)=>{
        if (data.id === payload.id){
          indexEdit = index
        } 
      })
      dataDummyEmployeeLimit[indexEdit] = payload;
      return [payload]
    }
  }

  deleteEmployee(id: string){
    let indexDelete = 0;
    dataDummyEmployeeLimit.forEach((data:dataEmployeeInterface, index:number)=>{
      if (data.id === id){
        indexDelete = index
      } 
    })
    dataDummyEmployeeLimit.splice(indexDelete,1);
    this.dataEmployeeAll = dataDummyEmployeeLimit; 
    this.actionDataEmployee(0,10);
  }

  getDetailEmployee(id: string){
    this.detailEmployee = this.dataEmployeeAll.filter((data:dataEmployeeInterface)=>{
      return data.id === id ;
    })
    return this.detailEmployee.length ? this.detailEmployee[0] : null;
  }

  getDataEmployee(){
    return this.dataEmployee.asObservable();
  }

  getLengthPaginationEmployee(){
    return this.paginationEmployee.asObservable();
  }
}
