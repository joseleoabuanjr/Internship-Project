import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {

  }
  registerForm = new FormGroup({
    firstName: new FormControl("Ang"),
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
