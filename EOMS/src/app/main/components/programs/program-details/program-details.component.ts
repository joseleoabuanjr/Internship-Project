import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from "@angular/forms";
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.scss']
})
export class ProgramDetailsComponent implements OnInit {
  id!: number;
  imageURL!: string;
  Date1 : Date = new Date();
  programs: any[]= []
  url="./assets/images/cict.png"
  value = "";
  grid = true;
  hidden = false;
  panelOpenState = false;

  displayProgramForm!: FormGroup;
  programdata: any;
  uploadedFileUrl!: any;
  image = '';

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService
  ) { }

  ngOnInit(): void {
    const urlid = this.route.snapshot.paramMap.get('id');
    this.id = parseInt(urlid!);

    this.displayProgramForm  = new FormGroup({
      banner: new FormControl('',[Validators.required]),
      upload_files: new FormControl('',[Validators.required]),
      date_time_start: new FormControl('',[Validators.required]),
      date_time_end: new FormControl('',[Validators.required]),
      program_title: new FormControl('',[Validators.required]),
      place: new FormControl('',[Validators.required]),
      program_details: new FormControl('',[Validators.required]),
      partners: new FormControl('',[Validators.required]),
      program_lead: new FormControl('',[Validators.required]),
      program_members: new FormControl('',[Validators.required]),
      participants: new FormControl('',[Validators.required]),
      program_flow: new FormControl('',[Validators.required]),
      additional_details: new FormControl('',[Validators.required]),
    });

    this.dataService.getSingleProgram(this.id).subscribe( program =>{
      this.displayProgramForm.patchValue(program.data);
    })
    }

  submitU(): void {
    this.displayProgramForm.value.id = this.id;
    this.dataService.getSingleProgram(this.displayProgramForm.value).subscribe({
      next: (data)=>{
        console.log(data);
        this.router.navigate(['main/programs']);
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
}
