import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-program',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  addProgram!: FormGroup;

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

  if(this.addProgram.value.start <= this.addProgram.value.end){

  }

}
}
