import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from '../core/components/navbar/navbar.component';
import { PartnersComponent } from './components/partners/partners.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    NavbarComponent,
    ProgramsComponent,
    PartnersComponent,
    AccountsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
  ]
})
export class MainModule { }
