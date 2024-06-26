import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../component/page-not-found/page-not-found.component';
import { LoginComponent } from '../views/auth/login/login.component';
import { AuthGuardService } from '../service/authService/auth-guard.service';
import { LoginGuardService } from '../service/authService/login-guard.service';
import { TableMaterialComponent } from '../views/table-material/table-material.component';
const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginGuardService],
    component: LoginComponent
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', 
    canActivate: [AuthGuardService],
    loadChildren:() => import('../views/dashboard/dashboard.module').then((m)=> m.DashboardModule) 
  },
  { 
    path: 'employee', 
    canActivate: [AuthGuardService],
    loadChildren: () => import('../views/employee/employee.module').then((m)=> m.EmployeeModule) 
  },
  // ******** trial use angular material table
  // { 
  //   path: 'table-material', 
  //   component: TableMaterialComponent
  // },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
