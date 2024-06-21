import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatedLayoutRoutingModule } from './authenticated-layout-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { AuthenticatedLayoutComponent } from './authenticated-layout/authenticated-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SublevelMenuComponent } from './sidebar/sublevel-menu.component';
import { ActualBodyComponent } from './actual-body/actual-body.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ExpenseTrackerModule } from '../../expense-tracker/expense-tracker.module';

@NgModule({
  declarations: [

    
  ],
  imports: [
    CommonModule,
    ExpenseTrackerModule,
    AuthenticatedLayoutRoutingModule,
    MatMenuModule,
    MatButtonModule,

  ],
})
export class AuthenticatedLayoutModule { }
