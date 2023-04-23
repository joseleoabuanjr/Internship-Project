import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-program',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  addProgram!: FormGroup;

  Date1 : Date = new Date();

  constructor(){}

  ngOnInit(): void {
    this.addProgram = new FormGroup({
      start: new FormControl('',[Validators.required]),
      end: new FormControl('',[Validators.required]),
      title: new FormControl('',[Validators.required]),
      fare: new FormControl('',[Validators.required]),
      logo: new FormControl('',[Validators.required])

    });
}
url="./assets/images/cict.png"

onselectFile(logo: any){
  if(logo.target.files){
    var reader = new FileReader();
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

programs: any[]= []
submit(): void {
  console.log('Saved: ' + JSON.stringify(this.addProgram.value));

  this.programs.push(this.addProgram.value)

  if(this.Date1 >= this.addProgram.value.end){

    let deleteIn = this.programs.findIndex(s => s.end == this.Date1)
    this.programs.splice(deleteIn)
  }

}
}
