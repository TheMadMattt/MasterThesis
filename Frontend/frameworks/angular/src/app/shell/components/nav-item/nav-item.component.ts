import {AfterViewInit, Component, Input} from '@angular/core';
import {MenuItem} from '@shell/models/menu-item';
import {SidenavService} from '@shell/services/sidenav.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements AfterViewInit {
  @Input()
  navItem!: MenuItem;

  @Input()
  isSidenavOpen!: Observable<any>;

  constructor(public sidenavService: SidenavService,
              private router: Router) { }

  close(): void {
    this.sidenavService.closeSidenav();
  }

  ngAfterViewInit(): void {
    this.isSidenavOpen.subscribe(() => {
      if (this.navItem.children.length > 0) {
        this.navItem.isSubMenuShowing = !!this.navItem.children.find(child => child.route === this.router.routerState.snapshot.url);
      }
    });
  }
}
