import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  addPartner!: FormGroup;

  constructor(){}

  ngOnInit(): void {
    this.addPartner = new FormGroup({
      name: new FormControl('',[Validators.required]),
      position: new FormControl('',[Validators.required]),
      faculty_id: new FormControl('',[Validators.required])
    });
}
submit(): void {
  console.log('Saved: ' + JSON.stringify(this.addPartner.value));
}
}
