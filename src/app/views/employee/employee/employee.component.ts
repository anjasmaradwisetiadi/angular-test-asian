import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authService/auth.service';
import { AuthGuardService } from 'src/app/service/authService/auth-guard.service';
import { dataUser } from 'src/assets/data/dataUser';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  dataResult: any;
  constructor(private authService: AuthService, private authGuardService: AuthGuardService) { }

  ngOnInit(): void {
  }


}
