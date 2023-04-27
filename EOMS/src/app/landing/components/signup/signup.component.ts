import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';

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
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  hide:boolean = true;
  signupForm!: FormGroup;
  vals = ''
  data= this.vals.split(',');

  constructor(
    private route: Router,
    private dataService: DataService,
    private authService: AuthService
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

    //Check if someone already Logged in
    if(this.authService.isLoggedIn){
      this.route.navigate(['main/dashboard']);
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  submit(): void {
    this.dataService.createUser(this.signupForm.value).subscribe({
      next: (data)=>{
        this.route.navigate(['landing/login']);
        // console.log('response: '+ JSON.stringify(data));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}


