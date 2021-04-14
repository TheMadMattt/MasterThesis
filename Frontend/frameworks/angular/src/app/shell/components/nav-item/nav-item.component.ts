import {Component, Input} from '@angular/core';
import {MenuItem} from '@shell/models/menu-item';
import {SidenavService} from '@shell/services/sidenav.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {
  @Input()
  navItem!: MenuItem;

  constructor(public sidenavService: SidenavService) { }

  close(): void {
    this.navItem.isSubMenuShowing = false;
    this.sidenavService.closeSidenav();
  }
}
