import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { PartnersComponent } from './components/partners/partners.component';
import { ProgramComponent } from './components/program/program.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'partners', component: PartnersComponent },
      { path: 'program', component: ProgramComponent },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
