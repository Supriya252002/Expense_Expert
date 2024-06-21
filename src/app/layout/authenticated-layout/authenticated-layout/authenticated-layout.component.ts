import { Component } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrls: ['./authenticated-layout.component.css'],
})
export class AuthenticatedLayoutComponent {
  isSideNavCollapsed = false;
  screenWidth = 0;

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    // 768
    if (this.screenWidth <= 1080) {
      this.isSideNavCollapsed = false;
      // this.onToggleSideNav.emit({
      //   collapsed: this.isSideNavCollapsed,
      //   screenWidth: this.screenWidth,
      // });
    } else {
      this.isSideNavCollapsed = true;
      // this.onToggleSideNav.emit({
      //   collapsed: this.isSideNavCollapsed,
      //   screenWidth: this.screenWidth,
      // });
    }
  }

  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
