import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-actual-body',
  templateUrl: './actual-body.component.html',
  styleUrls: ['./actual-body.component.css'],
})
export class ActualBodyComponent implements OnInit {
  @Input() collapsed: boolean = false;
  @Input() screenWidth: number = 0;
  constructor() {}

  ngOnInit() {
    this.getBodyClass();
  }

  getBodyClass() {
    let styleClass = '';
    if (!this.collapsed && this.screenWidth > 1080) {
      styleClass = 'body-trimmed';
    } else if (
      !this.collapsed &&
      this.screenWidth <= 1080 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }

    return styleClass;
  }
}
