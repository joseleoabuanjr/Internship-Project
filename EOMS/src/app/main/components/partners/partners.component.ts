import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  grid = true;
  hidden = false;
  filterValue!: string;
  dataSource: any;
  panelOpenState = false;
  partnerItems: any;
  obs!: Observable<any>;
  url="./assets/images/cict.png"

  isAdmin = false;
  status = false;
  isActive: boolean = true;
  useToken!: number;

  constructor(
    private dataService: DataService,
    private ref: ChangeDetectorRef
    ) {  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getPartner();
    const token = this.dataService.getToken();
    this.useToken = Number(token);
    this.dataService.getSingleUser(this.useToken).subscribe(user => {
      if(user.data.account_type == "faculty"){
        this.isAdmin = false;
      }
      else{
        this.isAdmin = true;
      }
    })
}

getPartner(): void {
  this.dataService.getPartners().subscribe(partners =>{
    this.dataSource = new MatTableDataSource(partners.data);
    console.log(partners.data);
    this.ref.detectChanges();
    setTimeout(()=>{
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.obs = this.dataSource.connect();
    });
  });
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
  this.getPartner();
}
}
