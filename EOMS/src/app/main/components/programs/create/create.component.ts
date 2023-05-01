import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  addProgram!: FormGroup;
  vals = ''
  data= this.vals.split(',');

  Date1 : Date = new Date();
  programs: any[]= []

  @Output() childToParent = new EventEmitter<any>();

  constructor(private route: Router,
              private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.addProgram = new FormGroup({
      // id: new FormControl([Validators.required]),
      date_and_time_start: new FormControl('',[Validators.required]),
      date_and_time_end: new FormControl('',[Validators.required]),
      program_title: new FormControl('',[Validators.required]),
      place: new FormControl('',[Validators.required]),
      banner: new FormControl('',[Validators.required]),
      upload_files: new FormControl('',[Validators.required]),
      program_details: new FormControl('',[Validators.required]),
      program_lead: new FormControl('',[Validators.required]),
      program_members: new FormControl('',[Validators.required]),
      participants: new FormControl('',[Validators.required]),
      program_flow: new FormControl('',[Validators.required]),
      additional_details: new FormControl('',[Validators.required]),
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
    console.log('Saved: ' + JSON.stringify(this.addProgram.value));

    this.dataService.createPrograms(this.addProgram.value).subscribe({
      next: (data)=>{
        this.route.navigate(['main/programs']);
      },
      error: (err) => {
        console.log(err);
      }
    });
    // this.programs.push(this.addProgram.value)
    // if(this.addProgram.value.start <= this.addProgram.value.end){
    //   this.childToParent.emit(this.addProgram.value)
    //   this.router.navigate(['main/programs'])
    // }

  }
}

