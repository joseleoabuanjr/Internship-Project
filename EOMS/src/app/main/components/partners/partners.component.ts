import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  addPartner!: FormGroup;
  grid = true;
  filterValue!: string;
  dataSource: any;
  panelOpenState = false;

  constructor(){ /* TODO document why this constructor is empty */ }

  ngOnInit(): void {
    this.addPartner = new FormGroup({
      name: new FormControl('',[Validators.required]),
      position: new FormControl('',[Validators.required]),
      logo: new FormControl('',[Validators.required])

    });
}
partners: any[]= []

submit(): void {

  this.partners.push(this.addPartner.value)

}
url="./assets/images/cict.png"

onselectFile(logo: any){
  if(logo.target.files){
    let reader = new FileReader();
    reader.readAsDataURL(logo.target.files[0]);
    reader.onload=(event:any)=>{
      this.url=event.target.result;
    }
  }
}

dis: any
show(){
  this.dis ="inline"
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
