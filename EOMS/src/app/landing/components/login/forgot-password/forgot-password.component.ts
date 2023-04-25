import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {
  email: string = "";
  hide:boolean = true;
  forgotPasswordForm!: FormGroup;
  vals = ''
  data= this.vals.split(',');

  constructor(
    private route: Router,
    private dataService: DataService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email:  new FormControl('', [Validators.required, Validators.email]),
    });

    //Check if someone already Logged in
    if(this.authService.isLoggedIn){
      this.route.navigate(['main/dashboard']);
    }
  }

  submit(): void {
    this.dataService.createUser(this.forgotPasswordForm.value).subscribe({
      next: (data)=>{
        this.route.navigate(['verify-email']);
        // console.log('response: '+ JSON.stringify(data));
      },

      error: (err) => {
        console.log(err);
      }
    });
  }
}
