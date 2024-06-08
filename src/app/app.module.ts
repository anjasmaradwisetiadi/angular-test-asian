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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const MAT_MODULES = [
  MatMenuModule,
  MatCardModule,
  MatToolbarModule,
  MatTabsModule,
  MatListModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSlideToggleModule,
  

  // aman
  MatButtonModule,
  MatInputModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
];

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
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    DashboardModule,
    EmployeeModule,
    ...MAT_MODULES
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
