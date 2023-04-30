import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Users } from '../models/users';
import { DataUser } from 'src/app/core/models/data';
import { Programs } from '../models/programs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor( private http: HttpClient) { }
  baseUrl: string = 'http://localhost/backend/';

  createUser(user: Users){
    return this.http.post<Users[]>(this.baseUrl+'insert.php', user);
  }

  getUsers() {
    return this.http.get<DataUser>(this.baseUrl+'getUsers.php');
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

  getPrograms() {
    return this.http.get<DataUser>(this.baseUrl+'view.php');
  }

  getApproval(){
    return this.http.get<DataUser>(this.baseUrl+'getApprovals.php');
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
