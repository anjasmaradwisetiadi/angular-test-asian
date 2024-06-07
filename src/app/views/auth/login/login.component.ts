import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email= '';
  password='';
  constructor(private authService: AuthService) { 
  }

  ngOnInit(): void {
  }

  submit(){
    this.authService.isLogin(this.email, this.password);
  }

}
