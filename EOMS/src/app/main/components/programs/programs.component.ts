import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-program',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  addProgram!: FormGroup;

  Date1 : Date = new Date();
  programs: any[]= []

  constructor(private route: ActivatedRoute) { }

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

      // this.route.paramMap.subscribe(params => {
      //   this.programs = params.get('programs').split(',');
      // }),
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

    this.programs.push(this.addProgram.value)

    if(this.addProgram.value.start <= this.addProgram.value.end){
      // Placeholder
    }

  }
}
