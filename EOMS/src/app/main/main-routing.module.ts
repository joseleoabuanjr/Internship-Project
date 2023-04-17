import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { PartnersComponent } from './components/partners/partners.component';
import { ProgramsComponent } from './components/subpages/programs/programs.component';
import { ReportsComponent } from './components/reports/reports.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { ApprovalsComponent } from './components/subpages/approvals/approvals.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateComponent } from './components/create/create.component';
import { AddComponent } from './components/add/add.component';
import { GenerateComponent } from './components/generate/generate.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'partners', component: PartnersComponent },
      { path: 'programs', component: ProgramsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'userslist', component: UserlistComponent},
      { path: 'approvals', component: ApprovalsComponent},
      { path: 'profile', component: ProfileComponent},
      { path: 'create', component: CreateComponent},
      { path: 'add', component: AddComponent},
      { path: 'generate', component: GenerateComponent}
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
