import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authService/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  signOut(){
    Swal.fire({
      title: "Are you sure want Sign Out ? ",
      text: "You will sign out from this app",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sign Out",
      confirmButtonColor: "#0d6efd",
    }).then((result)=>{
      if(result.isConfirmed){
        this.authService.isLogout();
      }
    })


  }

}
