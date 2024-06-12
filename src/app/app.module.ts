import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeModule } from './views/employee/employee.module';

import { DashboardModule } from './views/dashboard/dashboard.module';
import { componentModules } from './component/component-module';
import { LoginComponent } from './views/auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableMaterialComponent } from './views/table-material/table-material.component';
import { MAT_MODULES_IMPORT } from './module-material';

@NgModule({
  declarations: [
    AppComponent,
    ...componentModules,
    LoginComponent,
    TableMaterialComponent,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    DashboardModule,
    EmployeeModule,
    ...MAT_MODULES_IMPORT
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
