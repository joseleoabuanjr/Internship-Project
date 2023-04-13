import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

function validUser(c:AbstractControl): { [key: string]:boolean } | null {
  if (!(c.value.length >= 3)){
    return { 'userv': true}
  }
  return null
}
function validPass(c:AbstractControl): { [key: string]:boolean } | null {
  if (!(c.value.length >= 5)){
    return { 'passv': true}
  }
  return null
}

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
      firstname: new FormControl('',[Validators.required]),
      lastname: new FormControl('',[Validators.required]),
      faculty_id: new FormControl('',[Validators.required]),
      email:  new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('',[Validators.required, validUser]),
      password: new FormControl('',[Validators.required, validPass])
    });
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  submit(): void {
    console.log('Saved: ' + JSON.stringify(this.signupForm.value));
  }
}


