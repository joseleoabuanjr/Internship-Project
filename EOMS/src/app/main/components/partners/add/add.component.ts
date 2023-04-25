import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
  addPartner!: FormGroup;

  constructor( private router: Router){ /* TODO document why this constructor is empty */ }

  ngOnInit(): void {
    this.addPartner = new FormGroup({
      start: new FormControl('',[Validators.required]),
      end: new FormControl('',[Validators.required]),
      title: new FormControl('',[Validators.required]),
      place: new FormControl('',[Validators.required]),
      banner: new FormControl('',[Validators.required]),
      uploadFiles: new FormControl('',[Validators.required]),
      details: new FormControl('',[Validators.required]),
      leadAndMembers: new FormControl('',[Validators.required]),
      participants: new FormControl('',[Validators.required]),
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

  partners: any[]= []
  submit(): void {
    console.log('Saved: ' + JSON.stringify(this.addPartner.value));

    this.partners.push(this.addPartner.value)

    if(this.addPartner.value.start <= this.addPartner.value.end){
      // TODO document why this block is empty
    }

  }
}
