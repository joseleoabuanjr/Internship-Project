import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    {value: 'admin', viewValue: 'admin'},
  ];
  userdata: any;
  uploadedFileUrl!: any;
  image = '';

  constructor(
      private dataService: DataService,
      private route: ActivatedRoute
    ) {  }

  ngOnInit(): void {
    const urlid = this.route.snapshot.paramMap.get('id');
    this.id = parseInt(urlid!);

    this.infoForm = new FormGroup({
      first_name: new FormControl('',[Validators.required]),
      last_name: new FormControl('',[Validators.required]),
      faculty_id: new FormControl('',[Validators.required]),
      email:  new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('',[Validators.required, validUser]),
      password: new FormControl('',[Validators.required, validPass]),
      account_type: new FormControl(''),
    });

    this.dataService.getSingleUser(this.id).subscribe( users =>{
      this.infoForm.patchValue(users.data);
      // this.infoForm.get('username')?.disable();
      // this.infoForm.get('account_type')?.disable();
      // this.infoForm.get('faculty_id')?.disable();
    })
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  submit1(): void {
    this.infoForm.value.account_id = this.id;
    this.dataService.updateUser(this.infoForm.value).subscribe({
      next: (data)=>{
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  imageSrc:any = '';
  status:boolean = false
  onFileChange(event:any) {
    this.status = false
    const file = event.target.files[0];

    this.status = event.target.files.length>0?true:false
    if(this.status==true){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result;
        this.image = this.imageSrc.replace(/(\r\n|\n|\r)/gm, "")
      }
    }
  }
  submit(){

  }
}
