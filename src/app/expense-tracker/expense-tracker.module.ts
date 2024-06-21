import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseTrackerRoutingModule } from './expense-tracker-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ExpenseTrackerRoutingModule,
    SideNavComponent,

  ]
})
export class ExpenseTrackerModule {

 }
