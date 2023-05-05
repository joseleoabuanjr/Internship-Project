import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAdmin = false;
  status = false;
  isActive: boolean = true;
  useToken!: number;
  constructor(private dataService: DataService, private route: Router) { }

  ngOnInit() {
    const token = this.dataService.getToken();
    this.useToken = Number(token);
    this.dataService.getSingleUser(this.useToken).subscribe(user => {
      if(user.data.account_type == "faculty"){
        this.isAdmin = false;
      }
      else{
        this.isAdmin = true;
      }
    })
  }

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
