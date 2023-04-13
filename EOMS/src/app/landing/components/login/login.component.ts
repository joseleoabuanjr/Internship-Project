import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  hide:boolean = true;
  loginForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username:  new FormControl('', [Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  submit() {
    console.log('Saved: ' + JSON.stringify(this.loginForm.value));
  }

}
