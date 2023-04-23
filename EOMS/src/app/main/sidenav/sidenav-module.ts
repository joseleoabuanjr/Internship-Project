import { NgModule } from '@angular/core';
import { NavbarComponent } from "src/app/core/components/navbar/navbar.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "src/app/shared/material/material.module";
import { SidenavComponent } from './sidenav-component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'sidenav', component: SidenavComponent }
]

@NgModule({
    declarations: [
      NavbarComponent
    ],

    imports: [
      MaterialModule,
      BrowserAnimationsModule,
      RouterModule.forChild(routes)
    ],

    exports: [
      MaterialModule
    ]
})
export class SidenavModule { }
