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
import { ReactiveFormsModule } from '@angular/forms';
import { ReportsComponent } from './components/reports/reports.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    NavbarComponent,
    ProgramsComponent,
    PartnersComponent,
    AccountsComponent,
    ReportsComponent,
    UserlistComponent,
    ApprovalsComponent,
  ],

  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
