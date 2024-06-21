import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { INavbarData } from './helper';
import { navbarData } from './sidenav-data';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

export interface links {
  linkName: string;
  linkRoute: string;
}

export interface sideBarMenu {
  parent: string;
  child: Array<links>;
  parentRoute?: string;
  icon: string;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  sideBarData = navbarData;
  // adminSideBar = navbarData;
  showHamburger = false;
  userData: any;
  hideSubMenu: Boolean = false;
  isImgDefault: Boolean = false;
  userImage: any;
  isAdmin: Boolean = false;
  isVendor: Boolean = false;

  isSidebarOpen: boolean = true;
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed: boolean = true;
  screenWidth = 0;
  multiple: boolean = false;

  selectedParent: string | null = null;
  constructor() {
    let userType: any = sessionStorage.getItem('userType');
    this.sideBarData = navbarData;
    if (userType == 'ADMIN') {
      this.isAdmin = true;
      this.isVendor = false;
    } else if (userType == 'VENDOR') {
      this.isVendor = true;
      this.isAdmin = false;
    }
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

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 1080) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav() {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  showSideBar() {
    this.showHamburger = true;
    document.getElementById('sideBar')?.classList.add('sidebar-active');
  }

  hideSideBar() {
    this.showHamburger = false;
    document.getElementById('sideBar')?.classList.remove('sidebar-active');
  }

  handleClick(item: INavbarData): void {
    if (!this.multiple) {
      for (let modelItem of this.sideBarData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
    this.selectedParent = item.label;
  }

  mainMenu(item: INavbarData): void {
    if (!this.multiple) {
      for (let modelItem of this.sideBarData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    if (item.items?.length > 0) {
    } else {
      item.expanded = false;
      this.selectedParent = item.label;
    }
  }
}
