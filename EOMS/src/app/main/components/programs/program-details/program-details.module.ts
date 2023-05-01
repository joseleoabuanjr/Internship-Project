import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/shared/material/material.module";
import { ProgramDetailsComponent } from "./program-details.component";
import { ProgramsRouterModule } from "../programs-router";

@NgModule({
  declarations: [
    ProgramDetailsComponent
  ],

  imports: [
    RouterModule,
    MaterialModule,
    ProgramsRouterModule
  ]
})
export class ProgramDetailsModule { }
