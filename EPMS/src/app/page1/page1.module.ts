import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page1Component } from './page1.component';
import { LoginComponent } from '../login/login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'Page1', component: Page1Component,
    children:[
      {
        path: 'login', component: LoginComponent
      }
    ]
  },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class Page1Module { }
