import { Component, OnInit } from '@angular/core';
import { faExclamationTriangle, faHome, faHouseDamage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {

  faExclamationTriangle = faExclamationTriangle;
  faHome = faHome;
  faHouseDamage = faHouseDamage;

  constructor() { }

  ngOnInit() {
  }
}
