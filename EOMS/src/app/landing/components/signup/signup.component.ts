import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  hide:boolean = true;
  signupForm!: FormGroup;

  constructor(){}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      faculty_id: new FormControl(''),
      email:  new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl(''),
      password: new FormControl('')
    });
    console.log(this.hide);
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  submit(): void {
    console.log('Saved: ' + JSON.stringify(this.signupForm.value));
  }

}


