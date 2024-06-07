import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { authResponse } from '../interface/authInterface';
import { Router } from '@angular/router';
import { dataUserInterface } from '../../interface/authInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  conditionLogin = false;
  loggedIn = false
  conditionLoginSubject = new BehaviorSubject<boolean>(this.conditionLogin);
  constructor( private http:HttpClient, private router:Router) { 

  }

  isAuthenticated(){
    return this.conditionLoginSubject.asObservable()
  }


  async isLogin(email: string, password:string){
    const payload = {
      email:  email,
      password: password
    }
    await firstValueFrom(this.http.post(environment.base_url + 'login', payload))
      .then((value:any)=>{
        if(value.status){
          localStorage.setItem('user',JSON.stringify(value.data))
          this.conditionLoginSubject.next(true);
          this.router.navigate(['/dashboard'])
        } else {
          this.conditionLoginSubject.next(false);
        }
      })
      .catch((error)=>{
        console.log('error = ');
        console.log(error);
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
    this.conditionLoginSubject.next(false);
    this.router.navigate(['/login'])
  }

}
