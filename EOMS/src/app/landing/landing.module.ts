import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './landing.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MaterialModule
  ]
})
export class LandingModule { }
