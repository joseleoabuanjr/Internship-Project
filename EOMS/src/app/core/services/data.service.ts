import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Users } from '../models/users';
import { Data } from 'src/app/core/models/data';
import { Programs } from '../models/programs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  createPartners: any;
  constructor( private http: HttpClient) { }
  baseUrl: string = 'http://localhost/backend/';

  createUser(user: any){
    return this.http.post<any>(this.baseUrl+'createToApproval.php', user);
  }

  getUsers() {
    return this.http.get<Data>(this.baseUrl+'getUsers.php');
  }

  getSingleUser(id:number) {
    return this.http.get<any>(this.baseUrl+'getUsers.php?id='+id);
  }

  updateUser(user: any){
    return this.http.post<any>(this.baseUrl+'updateUser.php', user);
  }

  userLogin(username:any, password:  any){
    return this.http.post<any>(this.baseUrl+'login.php', { username, password })
    .pipe(map(Users =>{
      this.setToken(Users.data.account_id);
      return Users;
    }));
  }

  createPrograms(program: Programs){
    return this.http.post<Programs[]>(this.baseUrl+'programs.php', program);
  }

  // getPrograms() {
  //   return this.http.get<Data>(this.baseUrl+'view.php');
  // }

  getApprovals(){
    return this.http.get<Data>(this.baseUrl+'getApprovals.php?');
  }

  getSingleApproval(id: number){
    return this.http.get<Data>(this.baseUrl+'getApprovals.php?id='+id);
  }

  createToUsers(data: any){
    return this.http.post<any>(this.baseUrl+'createToUsers.php', data);
  }

  deleteApproval(id: number){
    return this.http.delete<any>(this.baseUrl+'deleteApproval.php?id='+id);
  }

  //Token-------------------------------
  setToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  deleteToken(){
    localStorage.removeItem('token');
  }
}
