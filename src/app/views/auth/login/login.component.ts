import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/service/authService/auth.service';
import { LoadingService } from 'src/app/service/loading.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private fb: FormBuilder, private loadingService:LoadingService) { 
  }

  loading=false;
  disabledButton = false;
  private subs = new SubSink;
  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.subs.sink = this.loadingService.isLoading.subscribe((data:boolean)=>{
      this.loading = data
    })
  }

  submit(){
    this.authService.isLogin(this.loginForm);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

}
