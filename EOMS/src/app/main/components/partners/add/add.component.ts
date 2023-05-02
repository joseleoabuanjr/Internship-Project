import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent implements OnInit {
  addPartner!: FormGroup;
  vals = ''
  data= this.vals.split(',');

  partners: any[]= []

  @Output() childToParent = new EventEmitter<any>();

  constructor(private route: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.addPartner = new FormGroup({
      // id: new FormControl([Validators.required]),
      partnership_start_date: new FormControl('',[Validators.required]),
      partnership_end_date: new FormControl('',[Validators.required]),
      banner: new FormControl('',[Validators.required]),
      upload_files: new FormControl('',[Validators.required]),
      partner_name: new FormControl('',[Validators.required]),
      partner_address: new FormControl('',[Validators.required]),
      contact_person: new FormControl('',[Validators.required]),
      contact_number: new FormControl('',[Validators.required]),
    });
  }
  url="./assets/images/cict.png"

  onselectFile(banner: any){
    if(banner.target.files){
      let reader = new FileReader();
      reader.readAsDataURL(banner.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }
    }
  }
  dis: any
  show(){
    this.dis ="inline"
  }

  submit(): void {
    console.log('Saved: ' + JSON.stringify(this.addPartner.value));

    this.dataService.createPartners(this.addPartner.value).subscribe({
      next: (data: any)=>{
        this.route.navigate(['main/partners']);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
    // this.partners.push(this.addPartner.value)
    // if(this.addPartner.value.start <= this.addPartner.value.end){
    //   this.childToParent.emit(this.addPartner.value)
    //   this.router.navigate(['main/partners'])
    // }

  }
}

