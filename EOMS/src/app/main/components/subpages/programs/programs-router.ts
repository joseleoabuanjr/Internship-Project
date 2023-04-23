import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramsComponent } from './programs.component';

const routes: Routes = [
  { path: 'programs', component: ProgramsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProgramsRouterModule { }
