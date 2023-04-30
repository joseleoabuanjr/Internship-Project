import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent {
  list = false;
  hidden = false;
  panelOpenState = false;
  filterValue="";
  displayedColumns: string[] = ['faculty_id', 'first_name', 'last_name', 'position','email' , 'action']
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
  }

  applyFilter(event: KeyboardEvent) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
}
