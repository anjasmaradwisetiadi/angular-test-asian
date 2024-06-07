import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authService/auth.service';

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
    this.authService.isLogout();
  }

}
