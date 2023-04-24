import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/core/services/data.service';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users: any;
  dataSource: any;
  displayedColumns: string[] = ['account_id', 'username', 'password', 'first_name', 'last_name', 'faculty_id'];

  constructor( private dataService: DataService ) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(
      result =>{
        console.log(result);
        this.users  =  result;
        this.dataSource = this.users;
      }
    )
  }

}
