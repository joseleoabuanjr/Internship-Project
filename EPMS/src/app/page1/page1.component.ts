import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  constructor(){}
  ngOnInit(): void {

  }
  registerForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
    idNum: new FormControl(""),
    phone: new FormControl(""),
    password: new FormControl(""),
    conPassword: new FormControl("")
  });

  registerSubmitted(){
    console.log(this.registerForm.value);
  }

}
