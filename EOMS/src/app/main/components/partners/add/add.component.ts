import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent implements OnInit {
  addPartner!: FormGroup;
  id!:number;
  imageURL!: string;
  vals = ''
  data= this.vals.split(',');

  partners: any[]= []

  @Output() childToParent = new EventEmitter<any>();

  constructor(private route: Router, private a_route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    const urlid = this.a_route.snapshot.paramMap.get('id');
    this.id = parseInt(urlid!);

    this.addPartner = new FormGroup({
      // id: new FormControl([Validators.required]),
      partnership_start_date: new FormControl('',[Validators.required]),
      partnership_end_date: new FormControl('',[Validators.required]),
      logo: new FormControl('',[Validators.required]),
      upload_files: new FormControl('',[Validators.required]),
      partner_name: new FormControl('',[Validators.required]),
      partner_address: new FormControl('',[Validators.required]),
      contact_person: new FormControl('',[Validators.required]),
      contact_number: new FormControl('',[Validators.required]),
    });
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

  submit(): void {
    console.log('Saved: ' + JSON.stringify(this.addPartner.value));

    this.dataService.createPartners(this.addPartner.value).subscribe({
      next: (data: any)=>{
        this.route.navigate(['main/partners']);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}

