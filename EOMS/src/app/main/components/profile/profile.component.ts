import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';

function validUser(c:AbstractControl): { [key: string]:boolean } | null {
  if (!(c.value.length >= 3)){
    return { 'userv': true}
  }
  return null
}
function validPass(c:AbstractControl): { [key: string]:boolean } | null {
  if (!(c.value.length >= 5)){
    return { 'passv': true}
  }
  return null
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  hide:boolean = true;
  imageURL!: string;
  uploadForm!: FormGroup;
  infoForm!: FormGroup;
  accountForm!: FormGroup;
  positions: any[] = [
    {value: 'faculty', viewValue: 'faculty'},
  ];

  constructor(
      private dataService: DataService
    ) {  }
  ngOnInit(): void {

    this.infoForm = new FormGroup({
      firstname: new FormControl('',[Validators.required]),
      lastname: new FormControl('',[Validators.required]),
      faculty_id: new FormControl('',[Validators.required]),
      email:  new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('',[Validators.required, validUser]),
      password: new FormControl('',[Validators.required, validPass]),
      file: new FormGroup({})
    });

  }

  showPreview($event: any){

  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  submit(): void {
    this.dataService.createUser(this.infoForm.value).subscribe({
      next: (data)=>{

      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
