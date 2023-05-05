import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  redirectUrl!: string;
  dataSource: any;
  fireauth: any;

  get isLoggedIn(): boolean {
    const useToken = this.dataService.getToken();
    if(useToken != null){
      return true;
    } else {
      return false;
    }
  }

  constructor(private dataService: DataService, private route: Router ) { }

  //Login
  login(username: string, password: string): void {
    this.dataService.userLogin(username, password).pipe(first()).subscribe({
      next: (User)=>{
        // this.router.navigate(['landing/login']);
        // console.log(User);
        if(User.success === 1){
          if(User.data.username === username && User.data.password === password){
            this.route.navigate(['main/dashboard']);
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

// Sign Up
signup(email : string, password : string) {
  this.fireauth.createUserWithEmailAndPassword(email, password).then( (res: { user: any; }) => {
    alert('Sign Up Successful');
    this.sendEmailForVarification(res.user);
    this.route.navigate(['/login']);
  }, (err: any) => {
    alert(err.message);
    this.route.navigate(['/signup']);
  })
}

//Logout
  logout(): void {
    this.dataService.deleteToken();
  }

//Forgot Password
  forgotPassword(email : string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.route.navigate(['/verify-email']);
    }, (err: any) => {
      alert('Something went wrong');
    })
  }

  //Email Verification
  sendEmailForVarification(user : any) {
    user.sendEmailVerification().then((res : any) => {
      this.route.navigate(['/verify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }
}
