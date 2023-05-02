import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
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
  id!:number;
  hide:boolean = true;
  imageURL!: string;
  infoForm!: FormGroup;
  positions: any[] = [
    {value: 'faculty', viewValue: 'faculty'},
  ];
  userdata: any;

  constructor(
      private dataService: DataService,
      private route: ActivatedRoute
    ) {  }
  ngOnInit(): void {
    const urlid = this.route.snapshot.paramMap.get('id');
    this.id = parseInt(urlid!);

    this.infoForm = new FormGroup({
      firstname: new FormControl('',[Validators.required]),
      lastname: new FormControl('',[Validators.required]),
      faculty_id: new FormControl('',[Validators.required]),
      email:  new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('',[Validators.required, validUser]),
      password: new FormControl('',[Validators.required, validPass]),
      file: new FormControl('')
    });
    this.dataService.getSingleUser(this.id).subscribe( users =>{
      // for(const user of users){

      // }
    })

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
