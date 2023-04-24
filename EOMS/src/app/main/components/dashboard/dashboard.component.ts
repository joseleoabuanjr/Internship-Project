import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  //Sidebar toggle show hide function
  status = false;
    addToggle()
    {
      this.status = !this.status;       
    }

}
