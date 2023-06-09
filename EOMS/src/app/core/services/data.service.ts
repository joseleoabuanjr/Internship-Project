import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Users } from '../models/users';
import { Data } from 'src/app/core/models/data';
import { Programs } from '../models/programs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // createPartners: any;
  constructor( private http: HttpClient) { }
  baseUrl: string = 'http://localhost/backend/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

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

  createPrograms(programs: any){
    return this.http.post<any>(this.baseUrl+'programs.php',  programs, this.httpOptions);
  }

  getPrograms() {
    return this.http.get<Data>(this.baseUrl+'getPrograms.php?id=');
  }

  getSingleProgram(id: number){
    return this.http.get<any>(this.baseUrl+'getPrograms.php?id='+id);
  }

  updateProgram(programs: any){
    return this.http.post<any>(this.baseUrl+'updateProgram.php', programs, this.httpOptions);
  }

  createPartners(partners: any){
    return this.http.post<any>(this.baseUrl+'partners.php',  partners, this.httpOptions);
  }

  getPartners(){
    return this.http.get<Data>(this.baseUrl+'getPartners.php?');
  }

  getSinglePartner(id: number){
    return this.http.get<any>(this.baseUrl+'getPartners.php?id='+id);
  }

  updatePartners(partners: any){
    return this.http.post<any>(this.baseUrl+'updatePartners.php', partners, this.httpOptions);
  }

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
