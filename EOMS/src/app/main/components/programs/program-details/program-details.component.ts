import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { CreateComponent } from "../create/create.component";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FormArray, FormBuilder, FormControlName, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { DataService } from "src/app/core/services/data.service";
import { Programs } from "src/app/core/models/programs";

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
  displayedColumns: string[] = ['id', 'program_title', 'date_and_time_start', 'date_and_time_end', 'place'];

  product!: Programs;
  errorMessage: any;
  displayProgramForm!: FormGroup;
  private sub!: Subscription;
  pageTitle: string | undefined;
  dataSource: MatTableDataSource<Programs> = new MatTableDataSource<Programs>();

  get tags(): FormArray {
    return this.displayProgramForm.get('tags') as FormArray;
  }

  // constructor(private router: Router, private route: ActivatedRoute) { }
  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.displayProgramForm = this.fb.group({
      id: [[Validators.required]],
      date_and_time_start: ['', [Validators.required]],
      date_and_time_end: ['', [Validators.required]],
      program_title: ['', [Validators.required]],
      place: ['', [Validators.required]],
      banner: ['', [Validators.required]],
      upload_files: ['', [Validators.required]],
      program_details: ['', [Validators.required]],
      program_lead: ['', [Validators.required]],
      program_members: ['', [Validators.required]],
      participants: ['', [Validators.required]],
      program_flow: ['', [Validators.required]],
      additional_details: ['', [Validators.required]],
    });

    // Read the product Id from the route parameter

    // this.sub = this.route.paramMap.subscribe(
    //   params => {
    //     const id = +params.get('id');
    //     this.createProgram(id);
    //   }
    // );
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(FormControlName, {read: ElementRef}) formInputElements!: ElementRef[];

  addProgram(newProgram: any) {
    this.programs.push(newProgram);
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  changeView()
  {
    this.grid = !this.grid;
  }

  edit(): void {
    //imagine
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

  // createPrograms(id: number): void {
  //   this.dataService.createProgram(id)
  //       .subscribe({
  //           next: (program: Programs) => this.displayProduct(program),
  //           error: err => this.errorMessage = err
  //       });
  // }

  // displayPrograms(program: Programs): void {
  //   if (this.displayProgramForm) {
  //     this.displayProgramForm.reset();
  //   }
  //   this.product = product;

  //   if (this.product.id === 0) {
  //     this.pageTitle = 'Add Product';
  //   } else {
  //     this.pageTitle = `Edit Product: ${this.product.productName}`;
  //   }

  //   // Update the data on the form
  //   this.displayProgramForm.patchValue({
  //     productName: this.product.productName,
  //     productCode: this.product.productCode,
  //     starRating: this.product.starRating,
  //     description: this.product.description
  //   });
  //   this.displayProgramForm.setControl('tags', this.fb.array(this.product.tags || []));
  // }
}
