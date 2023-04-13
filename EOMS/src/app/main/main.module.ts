import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from '../core/components/navbar/navbar.component';
import { ProgramComponent } from './components/program/program.component';
import { PartnersComponent } from './components/partners/partners.component';
import { AccountsComponent } from './components/accounts/accounts.component';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    NavbarComponent,
    ProgramComponent,
    PartnersComponent,
    AccountsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
