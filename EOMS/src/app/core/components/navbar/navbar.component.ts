import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private dataService: DataService, private route: Router) { }
  logout(){
    this.dataService.deleteToken();
    this.route.navigate(['../landing/login']);
  }
}
