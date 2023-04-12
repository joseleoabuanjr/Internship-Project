import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl("Ang"),
    lastName: new FormControl(""),
    email: new FormControl(""),
    idNum: new FormControl(""),
    phone: new FormControl(""),
    password: new FormControl(""),
    conPassword: new FormControl("")
  });

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  constructor(){}

  ngOnInit(): void {

  }

  registerSubmitted(){
    console.log(this.registerForm.value);
  }
}


