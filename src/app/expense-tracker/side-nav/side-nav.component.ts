import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faChartPie } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatIconModule,FontAwesomeModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  sidenavStatus = true;
fachartpie=faChartPie;
  constructor(private router: Router) { }

  toggleSlideOut(): void {
    this.sidenavStatus = !this.sidenavStatus;
  }

  Ondash() {
    this.router.navigate(['/expense-tracker/dashboard'])
  }
  Onprofile() {
    this.router.navigate(['/expense-tracker/profile'])
  }

  Onhistory() {
    this.router.navigate(['/expense-tracker/history'])
  }

  Onlogout() {
    this.router.navigate(['/expense-tracker/logout'])
  }
}