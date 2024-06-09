import { Component, OnDestroy, OnInit } from '@angular/core';
import { dataUser } from 'src/assets/data/dataUser';
import { AuthService } from './service/authService/auth.service';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { LoginGuardService } from './service/authService/login-guard.service';
import { EmployeeServiceService } from './views/employee/employee-service.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'boilerplate-angular14';
  loginGuard:boolean = false;
  private subs = new SubSink;

  constructor(private authService:AuthService, private loginGuardService:LoginGuardService , private employeeService: EmployeeServiceService){
    //********** */ trigger first time
    this.authService.isAutoLogin();
    this.subs.sink = this.authService.isAuthenticated()
    .subscribe((data)=>{
      this.loginGuard = data
    })

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
