import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-program',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  addPartner!: FormGroup;

  constructor(){}

  ngOnInit(): void {
    this.addPartner = new FormGroup({
      name: new FormControl('',[Validators.required]),
      position: new FormControl('',[Validators.required]),
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

partners: any[]= []
submit(): void {
  console.log('Saved: ' + JSON.stringify(this.addPartner.value));

  this.partners.push(this.addPartner.value)

}
}
