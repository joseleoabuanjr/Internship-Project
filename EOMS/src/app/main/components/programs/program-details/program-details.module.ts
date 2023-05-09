import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/shared/material/material.module";
import { ProgramsRouterModule } from "../programs-router";

@NgModule({

  imports: [
    RouterModule,
    MaterialModule,
    ProgramsRouterModule
  ]
})
export class ProgramDetailsModule { }
