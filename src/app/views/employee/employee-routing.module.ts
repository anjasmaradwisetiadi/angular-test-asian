import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    data: {},
  },
  {
    path: 'create',
    component: CreateEmployeeComponent,
    data: {},
  },
  {
    path: 'detail/:id',
    component: DetailEmployeeComponent,
    data: {},
  },
  {
    path: 'edit/:id',
    component: CreateEmployeeComponent,
    data: {},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
