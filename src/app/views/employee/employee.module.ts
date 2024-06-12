import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MAT_MODULES_IMPORT } from 'src/app/module-material';

@NgModule({
  declarations: [
    EmployeeComponent,
    DetailEmployeeComponent,
    CreateEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    NgSelectModule,
    ...MAT_MODULES_IMPORT
  ],
  providers:[
  ]
})
export class EmployeeModule { }
