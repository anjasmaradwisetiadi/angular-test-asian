import {  Injectable  } from '@angular/core';
import {   
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  result: boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> = true;
  constructor(private authService:AuthService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any{
     this.authService.isAuthenticated().subscribe((data: boolean)=>{
        if(data){
          this.result = true
        } else {
          this.router.navigate(['/login'])
          this.result = false
        }
      })
      return this.result
  }
}
