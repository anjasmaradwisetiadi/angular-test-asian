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
import { AuthService } from './service/authService/auth.service';
import { AuthGuardService } from './service/authService/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    ...componentModules,
    LoginComponent,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    DashboardModule,
    EmployeeModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
