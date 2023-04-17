import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/core/models/users';
import { UserDataService } from 'src/app/core/services/user-data.service';

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
  vals = ''
  data= this.vals.split(',');

  constructor(
    private router: Router,
    private userService: UserDataService
  ){}

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
    this.userService.createUser(this.signupForm.value).subscribe({
      next: (data)=>{
        console.log('response: '+ JSON.stringify(data));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}


