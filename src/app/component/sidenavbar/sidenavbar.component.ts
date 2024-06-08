import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {

  constructor( private route:ActivatedRoute, private location: Location ) { }
  routeActive:string = '';
  ngOnInit(): void {
    this.routeActive = this.location.path();
  }

}
