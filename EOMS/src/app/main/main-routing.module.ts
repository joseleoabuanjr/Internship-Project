import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { PartnersComponent } from './components/partners/partners.component';
import { ReportsComponent } from './components/reports/reports.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { ApprovalsComponent } from './components/accounts/approvals/approvals.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateComponent } from './components/programs/create/create.component';
import { AddComponent } from './components/partners/add/add.component';
import { GenerateComponent } from './components/reports/generate/generate.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { PartnershipsComponent } from './components/partners/partnerships/partnerships/partnerships.component';
import { ProgramDetailsComponent } from './components/programs/program-details/program-details.component';
import { PartnerDetailsComponent } from './components/partners/partner-details/partner-details.component';


const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'accounts/approvals', component: ApprovalsComponent},
      { path: 'partners', component: PartnersComponent },
      { path: 'partners/add', component: AddComponent},
      { path: 'partners/partner-details/:id', component: PartnerDetailsComponent },
      { path: 'programs', component: ProgramsComponent },
      { path: 'programs/create', component: CreateComponent},
      { path: 'programs/program-details/:id', component: ProgramDetailsComponent},
      { path: 'reports', component: ReportsComponent },
      { path: 'userslist', component: UserlistComponent},
      { path: 'profile/:id', component: ProfileComponent},
      { path: 'accounts/profile/:id', component: ProfileComponent},
      { path: 'generate', component: GenerateComponent},
      { path: 'partnerships', component: PartnershipsComponent}
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
