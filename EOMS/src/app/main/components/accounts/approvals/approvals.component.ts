import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { DialogComponent } from './dialog/dialog.component';
import { Users } from 'src/app/core/models/users';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent {
  list = false;
  hidden = false;
  filterValue="";
  displayedColumns: string[] = ['faculty_id', 'first_name', 'last_name', 'email' , 'action']
  dataSource: any = [];
  obs!: Observable<any>;
  submit!: boolean;
  approvaldata: any;
  hasData!: boolean;
  btn!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dataService: DataService,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataService.getApprovals().subscribe(users => {
      if(users.success == 0){
        this.hasData = false;
      }
      else {
        this.hasData = true;
      }
    })
    this.getdata();
  }

  getdata(): void {
    this.dataService.getApprovals().subscribe(users =>{
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

  openApproveDialog(element: any) {
    const elementdata = element;
    this.btn = 'approve';

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {submit: this.submit, btn: this.btn}
    });

    dialogRef.afterClosed().subscribe((result) => {
      //check if successful
      if(result == true){
        this.dataService.getSingleApproval(elementdata.account_id).subscribe(data =>{

          //check if successful
          if(data.success == 1){

            //get value of data array
            for(const user of data.data){
              const first_name = user.first_name;
              const last_name = user.last_name;
              const email = user.email;
              const username = user.username;
              const password = user.password;
              const faculty_id = user.faculty_id;

              //create new json object and pass the values
              this.approvaldata = {first_name, last_name,email, username, password, faculty_id}
            }
            this.dataService.createToUsers(this.approvaldata).subscribe(users =>{
              if(users.success == 1){
                this.dataService.deleteApproval(elementdata.account_id).subscribe(users =>{
                  if(users.success == 1){
                    this.getdata();
                  }
                });
              }
            });
          }
        })
      }
    });
  }

  openRejectDialog(element: any) {
    const elementdata = element;
    this.btn = 'reject';

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {submit: this.submit, btn: this.btn}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result == true){
        this.dataService.deleteApproval(elementdata.account_id).subscribe(users =>{
          if(users.success == 1){
            this.getdata();
          }
        });
      }
    });
  }
}

