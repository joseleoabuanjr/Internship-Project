import { NgModule } from "@angular/core";
import { MainComponent } from "src/app/main/main.component";
import { MainRoutingModule } from "src/app/main/main-routing.module";
import { MaterialModule } from "src/app/shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule ({
  declarations: [
    MainComponent
  ],

  imports: [
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CreateModule {}
