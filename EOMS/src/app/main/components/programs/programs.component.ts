import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  programId!: number;
  Date1 : Date = new Date();
  programs: any[]= []
  grid = true;
  value = "";
  hidden = false;
  panelOpenState = false;
  displayedColumns: string[] = ['account_id', 'username', 'faculty_id'];
  filterValue!: string;
  dataSource: any;
   //dataSource: MatTableDataSource<Programs> = new MatTableDataSource<Programs>();


  constructor(private router: Router, private route: ActivatedRoute) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  addProgram(newProgram: any) {
    this.programs.push(newProgram);
  }

  ngOnInit(): void {

    // const id = +this.route.snapshot.paramMap.get('id');
    // this.route.paramMap.subscribe(params => {
    //   this.programId = +params.get('id');
    // });
  }

  url="./assets/images/cict.png"

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  //Sidebar toggle show hide function
  changeView()
  {
    this.grid = !this.grid;
  }

  applyFilter(event: KeyboardEvent) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
}
