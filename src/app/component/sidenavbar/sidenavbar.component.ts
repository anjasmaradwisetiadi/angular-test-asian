import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/service/authService/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {

  constructor( private route:ActivatedRoute, private location: Location, private router: Router, private authService:AuthService ) { }
  routeActive:string = '';
  ngOnInit(): void {
    this.routeActive = this.location.path();
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
