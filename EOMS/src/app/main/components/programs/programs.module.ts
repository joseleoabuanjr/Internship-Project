import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProgramDetailsModule } from "./program-details/program-details.module";

@NgModule({

  imports: [
    RouterModule,
    ProgramDetailsModule

  ]
})
export class ProgramsModule { }

