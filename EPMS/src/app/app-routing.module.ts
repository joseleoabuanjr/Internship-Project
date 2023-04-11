import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page2Component } from './page2/page2.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page1/page1.module').then(m => m.Page1Module)
  },
  {
    path: 'Page2', component: Page2Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
