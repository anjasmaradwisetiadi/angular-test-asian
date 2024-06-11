import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { authResponse } from '../interface/authInterface';
import { Router } from '@angular/router';
import { dataUserInterface } from '../../interface/authInterface';
import { LoadingService } from '../loading.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  conditionLogin = false;
  loggedIn = false
  conditionLoginSubject = new BehaviorSubject<boolean>(this.conditionLogin);
  constructor( private http:HttpClient, private router:Router, private loading: LoadingService) { 

  }

  isAuthenticated(){
    return this.conditionLoginSubject.asObservable()
  }

  async isLogin(data:any){  
    this.loading.conditionLoading(true);
    const payload = {
      email:  data.value.email,
      password: data.value.password
    }
    await firstValueFrom(this.http.post(environment.base_url + 'login', payload))
      .then((value:any)=>{
        if(value.status){
          localStorage.setItem('user',JSON.stringify(value.data))
          this.conditionLoginSubject.next(true);
          Swal.fire({
            title: "Success",
            text: "Successfull Login",
            icon: "success"
          }).then((confirm)=>{
            if(confirm){
              this.router.navigate(['/dashboard'])
            }
          });
        } else {
          Swal.fire({
            title: "Unsuccessfull",
            text: value.message,
            icon: "error"
          })
          this.conditionLoginSubject.next(false);
        }
        this.loading.conditionLoading(false);
      })
      .catch((error)=>{
        console.log('error = ');
        console.log(error);
        this.loading.conditionLoading(false);
      })
  }
  
  isAutoLogin(){
    let getLocalStorage = localStorage.getItem('user'); 
    const dataUser:dataUserInterface|null = getLocalStorage ? JSON.parse(getLocalStorage) : null
    if(dataUser?.email){
      this.conditionLoginSubject.next(true);
    } else {
      this.conditionLoginSubject.next(false);
    }
  }

  isLogout(){
    localStorage.removeItem('user'); 
    localStorage.removeItem('sort_and_filter'); 
    this.conditionLoginSubject.next(false);
    this.router.navigate(['/login'])
  }

}
