import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  addProgram!: FormGroup;

  constructor( private router: Router){ /* TODO document why this constructor is empty */ }

  ngOnInit(): void {
    this.addProgram = new FormGroup({
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

  programs: any[]= []
  submit(): void {
    console.log('Saved: ' + JSON.stringify(this.addProgram.value));

    this.programs.push(this.addProgram.value)

    if(this.addProgram.value.start <= this.addProgram.value.end){
      // TODO document why this block is empty
    }

  }
}
