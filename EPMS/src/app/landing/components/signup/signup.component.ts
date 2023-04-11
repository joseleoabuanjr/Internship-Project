import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupUsers: any[] = [];
  signUpObj: any = {
    firstName: '',
    lastName: '',
    email: '',
    idNum: '',
    phone: '',
    password: '',
    confirmpassword: ''
  }
  constructor(){}

  ngOnInit(): void {

  }
  onSignUp(){
    this.signupUsers.push(this.signUpObj)
    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
  }
}
