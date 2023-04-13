import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(){}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      faculty_id: new FormControl(),
      email:  new FormControl(),
      username: new FormControl(),
      password: new FormControl()
    });
  }

  submit() {
    console.log(this.signupForm);
    console.log('Saved: ' + JSON.stringify(this.signupForm));
  }

}


