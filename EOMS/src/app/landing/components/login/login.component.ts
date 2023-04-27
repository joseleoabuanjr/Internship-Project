import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hide:boolean = true;
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username:  new FormControl('', [Validators.required]),
      password: new FormControl('',[Validators.required])
    });

    //Check if someone already Logged in
    if(this.authService.isLoggedIn){
      this.route.navigate(['main/dashboard']);
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  submit() {
    if (this.loginForm && this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.authService.login(username, password);

    } else {
      console.log('Please enter a user name and password.');
    }
  }

}
