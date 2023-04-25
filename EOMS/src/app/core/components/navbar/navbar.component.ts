import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  status = false;
  constructor(private dataService: DataService, private route: Router) { }

  //Sidebar toggle show hide function
  addToggle()
  {
    this.status = !this.status;
  }

  logout(){
    this.dataService.deleteToken();
    this.route.navigate(['../landing/login']);
  }
}
