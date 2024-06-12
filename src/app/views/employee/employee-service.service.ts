import { Injectable } from '@angular/core';
import { dataDummyEmployeeLimit } from 'src/assets/data/dataEmployee';
import { dataDummyEmployee } from 'src/assets/data/dataEmployee';
import { dataEmployeeInterface } from 'src/app/interface/employee-interface'
import { BehaviorSubject, filter } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor() { }
  data = []
  dataEmployeeAll = dataDummyEmployee; 
  detailEmployee:dataEmployeeInterface[]=[]; 
  dataEmployee = new BehaviorSubject<dataEmployeeInterface[]>(this.data);
  paginationEmployee = new BehaviorSubject<number>(0);

  actionDataEmployee(start:number = 0, end:number = 100){
    this.dataEmployee.next(this.dataEmployeeAll.slice(start,end));
    // this.actionPaginationEmployee();
  } 

  actionPaginationEmployee(differential:number = 1 ){
    let calculatePagination = 0
    this.getDataEmployee().subscribe((data)=>{
      calculatePagination = data?.length / differential
      // calculatePagination = calculatePagination < 1 ? 1 : calculatePagination 
    })
    this.paginationEmployee.next(calculatePagination)
  }

  addEmployee(from:string, payload:any) {
    if(from === 'add'){
      return dataDummyEmployee.unshift(payload);
    } else {
      let indexEdit = 0;
      dataDummyEmployee.forEach((data:dataEmployeeInterface, index:number)=>{
        if (data.id === payload.id){
          indexEdit = index
        } 
      })
      dataDummyEmployee[indexEdit] = payload;
      return [payload]
    }
  }

  deleteEmployee(id: string){
    let indexDelete = 0;
    dataDummyEmployee.forEach((data:dataEmployeeInterface, index:number)=>{
      if (data.id === id){
        indexDelete = index
      } 
    })
    dataDummyEmployee.splice(indexDelete,1);
    this.dataEmployeeAll = dataDummyEmployee; 
    this.actionDataEmployee(0,100);
  }

  actionFilterEmployee(payload, sorting:object = {}){
    let dataFilter = [];
    dataFilter = this.dataEmployeeAll.filter(item => {
      // Check user_name
      const userNameMatch = payload.user_name ? item.user_name.trim().includes(payload.user_name.trim()) : true;
  
      // Check email
      const emailMatch = payload.email ? item.email.trim().includes(payload.email.trim()) : true;
  
      // Check status
      const statusMatch = payload.status ? item.status === payload.status : true;
  
      // Check basic_salary
      const basicSalaryMatch = payload.basic_salary ? item.basic_salary === payload.basic_salary : true;
  
      // Return true if all conditions match
      return userNameMatch && emailMatch && statusMatch && basicSalaryMatch;
    });
    this.actionDataEmployee(0, 100);
    dataFilter = this.actionFilterSorting(dataFilter, sorting)
    this.dataEmployee.next(dataFilter);
    this.actionPaginationEmployee();
  }

  actionFilterSorting(payload, sorting:object = {}){
    if(sorting){
      let nameSort = Object.keys(sorting)
      if(nameSort?.length){
        payload = payload.sort((a, b) => {
          if(nameSort[0] !== 'basic_salary'){
            const nameA = a[`${nameSort}`].toLowerCase(); // ignore upper and lowercase
            const nameB = b[`${nameSort}`].toLowerCase(); // ignore upper and lowercase
            if(sorting[`${nameSort}`] === 'asc'){
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
            } else {
              if (nameA > nameB) {
                return -1;
              }
              if (nameA < nameB) {
                return 1;
              }
            }
            // names must be equal
            return 0;
          } else {
            if(sorting[`${nameSort}`] === 'asc'){
              return a[`${nameSort}`] - b[`${nameSort}`]
            } else {
              return b[`${nameSort}`] - a[`${nameSort}`]
            }
          }
        });
        return payload;
      } 
    }
    return payload;
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
