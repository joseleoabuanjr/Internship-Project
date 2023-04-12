import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string | undefined;
  password: string | undefined;
  constructor() {}

  ngOnInit(){

  }
  Loginuser (){
    if (this.username == "Admin" && this.password == "Admin123")
    {
      console.log("Welcome");
    }
  }

}
