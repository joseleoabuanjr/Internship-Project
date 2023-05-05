import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  grid = true;
  list = false;
  hidden = false;
  panelOpenState = false;
  filterValue!: string;
  programId!: number;
  Date1 : Date = new Date();
  programs: any[]= []
  url="./assets/images/cict.png"
  displayedColumns: string[] = ['id', 'program_title', 'date_and_time_start', 'date_and_time_end', 'place'];
  usersData: any;
  dataSource: any;
   //dataSource: MatTableDataSource<Programs> = new MatTableDataSource<Programs>();
  render = false;
  obs!: Observable<any>;
  defaultSortOption = 'name';
  sortedData:any = [];



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private ref: ChangeDetectorRef
    ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getProgram();
  }


  getProgram(): void {
    // this.dataService.getPrograms().subscribe(users =>{
    //   this.dataSource = new MatTableDataSource(users.data);
    //   console.log(users.data);
    //   this.ref.detectChanges();
    //   setTimeout(()=>{
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //     this.obs = this.dataSource.connect();
    //   });
    // });
  }

  ngOnDestroy() {
    // if (this.dataSource) {
    //   this.dataSource.disconnect();
    // }
    // this.dataSource.disconnect();
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
    this.getProgram();
  }
}
