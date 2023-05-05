import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { UploadWidgetConfig, UploadWidgetResult, Uploader } from 'uploader';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  addProgram!: FormGroup;
  id!:number;
  imageURL!: string;
  vals = ''
  data= this.vals.split(',');

  Date1 : Date = new Date();
  programs: any[]= []
  uploadedFileUrl!: string;

  @Output() childToParent = new EventEmitter<any>();


  constructor(private route: Router,
              private a_route: ActivatedRoute,
              private dataService: DataService
  ) { }

  uploader = Uploader({ apiKey:"free" });
    options: UploadWidgetConfig = {
      multi: true,
    };
    onComplete = (files: UploadWidgetResult[]) => {
      this.uploadedFileUrl = files[0]?.fileUrl;
      console.log(files[0]);
    };

  ngOnInit(): void {
    // const urlid = this.a_route.snapshot.paramMap.get('id');
    // this.id = parseInt(urlid!);

    this.addProgram = new FormGroup({
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
      partners: new FormControl('',[Validators.required])
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

