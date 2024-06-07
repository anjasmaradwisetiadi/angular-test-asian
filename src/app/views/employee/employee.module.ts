import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    DetailEmployeeComponent,
    CreateEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
