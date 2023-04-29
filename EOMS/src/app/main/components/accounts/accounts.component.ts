import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Users } from 'src/app/core/models/users';
import { first, map, tap } from 'rxjs';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, AfterViewInit{
  grid = true;
  value = "";
  hidden = false;
  panelOpenState = false;
  displayedColumns: string[] = ['account_id', 'username', 'faculty_id'];
  dataSource: MatTableDataSource<Users> = new MatTableDataSource<Users>();
  usersData: any;



  constructor(
    private dataService: DataService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataService.getUsers()
    .subscribe({
      next: (User: any)=>{
        this.usersData = User.data;
        const ELEMENT_DATA = [...this.usersData];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        console.log(this.dataSource);
        // if(User.success === 1){
        //   this.dataSource.data = User.data;
        //   this.usersData = User.data;
        // }

      },
      error: (err) => {
        console.log(err);
      }
    })
    // .subscribe(
    //   (result) => {
    //     console.log(result);
    //     this.usersData = result.data;
    //     this.dataSource = new MatTableDataSource<Users>(this.usersData);
    //   }
    // )
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
    // this.dataSource.paginator = this.paginator;

  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  //Sidebar toggle show hide function
  changeView()
  {
    this.grid = !this.grid;
  }
}
