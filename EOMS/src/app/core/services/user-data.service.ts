import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor( private http: HttpClient) { }
  baseUrl: string = 'http://localhost/backend/';

  getUsers() {
    return this.http.get<Users[]>(this.baseUrl+'view.php');
  }
}
