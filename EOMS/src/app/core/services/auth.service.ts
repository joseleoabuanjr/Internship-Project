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

  get isLoggedIn(): boolean {
    const useToken = this.dataService.getToken();
    if(useToken != null){
      return true;
    } else {
      return false;
    }
  }

  constructor(private dataService: DataService, private route: Router ) { }

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

  logout(): void {
    this.dataService.deleteToken();
  }

}
