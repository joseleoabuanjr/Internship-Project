import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { map, tap } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
// import { UploadWidgetConfig, UploadWidgetResult, Uploader } from 'uploader';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     multi: true,
  //     useExisting: CreateComponent
  //   }
  // ]
})

export class CreateComponent implements OnInit {
  addProgram!: FormGroup;
  id!:number;
  imageURL = '';
  vals = ''
  data= this.vals.split(',');

  programs: any[]= []
  displayedColumns: string[] = ['id', 'program_title', 'date_and_time_start', 'date_and_time_end', 'place'];
  uploadedFileUrl!: string;

  url="./assets/images/cict.png"

  @Output() childToParent = new EventEmitter<any>();


  constructor(private route: Router,
              private a_route: ActivatedRoute,
              private dataService: DataService
  ) { }

    // uploader = Uploader({ apiKey:"free" });
    // options: UploadWidgetConfig = {
    //   multi: true,
    // };
    // onComplete = (files: UploadWidgetResult[]) => {
    //   this.uploadedFileUrl = files[0]?.fileUrl;
    //   console.log(files[0]);
    // };

  ngOnInit(): void {
    // const urlid = this.a_route.snapshot.paramMap.get('id');
    // this.id = parseInt(urlid!);

    this.addProgram = new FormGroup({
      banner: new FormControl('',[Validators.required]),
      upload_files: new FormControl('',[Validators.required]),
      program_title: new FormControl('',[Validators.required]),
      date_time_start: new FormControl('',[Validators.required]),
      date_time_end: new FormControl('',[Validators.required]),
      place: new FormControl('',[Validators.required]),
      program_details: new FormControl('',[Validators.required]),
      partners: new FormControl('',[Validators.required]),
      program_lead: new FormControl('',[Validators.required]),
      program_members: new FormControl('',[Validators.required]),
      participants: new FormControl('',[Validators.required]),
      program_flow: new FormControl('',[Validators.required]),
      additional_details: new FormControl('',[Validators.required])
    });
  }

  // onselectFile(banner: any){
  //   if(banner.target.files){
  //     let reader = new FileReader();
  //     reader.readAsDataURL(banner.target.files[0]);
  //     reader.onload=(event:any)=>{
  //       this.url=event.target.result;
  //     }
  //   }
  // }

  // writeValue(_file: string): void {
  //   this.imageURL = _file;
  // }
  // registerOnChange(fn: any): void {
  //   this.onChange = fn;
  // }
  // registerOnTouched(fn: any): void {
  //   this.onTouched = fn;
  // }
  // setDisabledState?(isDisabled: boolean): void {
  //   this.disabled = isDisabled;
  // }

  // onChange = (fileUrl: string) => {};

  // onTouched = () => {};

  // disabled: boolean = false;

  // imageSrc:any = '';
  // status:boolean = false

  // onFileChange(event:any) {
  //   const files = event.target.files as FileList;
  //   if (files.length > 0) {
  //     const _file = URL.createObjectURL(files[0]);
  //     this.imageURL = _file;
  //     this.resetInput();
  //     this.onChange(this.imageURL);
  //   }
    // this.status = false
    // const file = event.target.files[0];

    // this.status = event.target.files.length>0?true:false
    // if(this.status==true){
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     this.imageSrc = reader.result;
    //     this.imageURL = this.imageSrc.replace(/(\r\n|\n|\r)/gm, "")
    //   }
    // }
  // }

  // resetInput(){
  //   const input = document.getElementById('banner-input-file') as HTMLInputElement;
  //   if(input){
  //     input.value = "";
  //   }
  // }

  // dis: any
  // show(){
  //   this.dis = "inline"
  // }

  submit(): void {
    // console.log('Saved: ' + JSON.stringify(this.addProgram.value));

    this.dataService.createPrograms(this.addProgram.value).subscribe({
      next: (data)=>{
        this.route.navigate(['main/programs']);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
}

