import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from '../core/components/navbar/navbar.component';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
