import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { NavbarHeadingService } from 'src/app/service/navbar/navbar-heading.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isExpanded: boolean = false;
  userDataRealtime: any;
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  navbarHeading: string = '';

  userDetails: any;

  @Input() collapsed: boolean = false;
  @Input() screenWidth: number = 0;

  constructor(
    private router: Router,
    private navbarHeadingService: NavbarHeadingService
  ) {
    let userData = sessionStorage.getItem('userData');

    if (userData != null) {
      this.userDataRealtime = JSON.parse(userData);
      this.navbarHeadingService.setUserDetails(this.userDataRealtime);
    }

    navbarHeadingService.navbarHeadingValue.subscribe((res) => {
      this.navbarHeading = res;
    });

    navbarHeadingService.userDetailValue.subscribe((res) => {
      this.userDetails = res;
    });
  }

  ngOnInit() {
    // this.screenWidth = window.innerWidth;
    // if (!this.collapsed && this.screenWidth > 1080) {
    //   this.collapsed = false;
    // } else if (
    //   !this.collapsed &&
    //   this.screenWidth <= 1080 &&
    //   this.screenWidth > 0
    // ) {
    //   this.collapsed = true;
    // }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    // 768
    if (this.screenWidth <= 1080) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    } else {
      this.collapsed = true;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  logout() {
    sessionStorage.removeItem('userData');
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  onDropdownClicked() {
    this.isExpanded = !this.isExpanded;
  }
}
