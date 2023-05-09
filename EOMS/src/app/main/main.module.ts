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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReportsComponent } from './components/reports/reports.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { ApprovalsComponent } from './components/accounts/approvals/approvals.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateComponent } from './components/programs/create/create.component';
import { AddComponent } from './components/partners/add/add.component';
import { GenerateComponent } from './components/reports/generate/generate.component';
import { PartnershipsComponent } from './components/partners/partnerships/partnerships/partnerships.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ItemComponent } from './components/item/item.component';
import { DialogComponent } from './components/accounts/approvals/dialog/dialog.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AvatarComponent } from './components/profile/components/avatar/avatar.component';
import { BannerComponent } from './components/programs/banner/banner.component';
import { UploaderModule } from 'angular-uploader';
import { UploadFilesComponent } from './components/programs/upload-files/upload-files.component';
import { ProgramDetailsComponent } from './components/programs/program-details/program-details.component';

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
    ProfileComponent,
    CreateComponent,
    ProgramDetailsComponent,
    AddComponent,
    GenerateComponent,
    PartnershipsComponent,
    ItemComponent,
    DialogComponent,
    AvatarComponent,
    BannerComponent,
    UploadFilesComponent,
  ],

  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    UploaderModule
  ],
  exports: [DashboardComponent],
})
export class MainModule { }
