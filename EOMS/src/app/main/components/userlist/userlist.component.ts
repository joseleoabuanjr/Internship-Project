import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/core/services/user-data.service';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users: any;
  dataSource: any;
  displayedColumns: string[] = ['account_id', 'username', 'password', 'first_name', 'last_name', 'faculty_id'];

  constructor( private userservice: UserDataService ) { }

  ngOnInit(): void {
    this.userservice.getUsers().subscribe(
      (result:any)=>{
        console.log(result)
        this.users  =  result.data;
        this.dataSource = this.users;
      }
    )
  }

}
