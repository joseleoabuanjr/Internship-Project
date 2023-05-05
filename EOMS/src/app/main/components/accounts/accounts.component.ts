import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { Users } from 'src/app/core/models/users';
import { Observable, first, map, tap } from 'rxjs';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy{
  grid = true;
  list = false;
  hidden = false;
  panelOpenState = false;
  filterValue="";
  displayedColumns: string[] = ['faculty_id', 'first_name', 'last_name', 'position', 'action']
  usersData: any;
  dataSource: any = [];
  render = false;
  obs!: Observable<any>;
  defaultSortOption = 'name';
  sortedData:any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dataService: DataService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getdata();
  }


  getdata(): void {
    this.dataService.getUsers().subscribe(users =>{
      this.dataSource = new MatTableDataSource(users.data);
      this.ref.detectChanges();
      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.obs = this.dataSource.connect();
      });
    });
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.dataSource.disconnect();
  }

  applyFilter(event: KeyboardEvent) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  //Sidebar toggle show hide function
  changeView()
  {
    this.grid = !this.grid;
    this.getdata();
  }
}
