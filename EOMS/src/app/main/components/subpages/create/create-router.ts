import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateModule } from './create-module';

const routes: Routes = [
  { path: 'create', component: CreateModule },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CreateRouterModule { }
