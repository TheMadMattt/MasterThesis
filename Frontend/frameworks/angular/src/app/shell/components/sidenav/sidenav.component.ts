import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {MenuList} from '@shell/nav-menu-list';
import {Subject} from 'rxjs';
import {BreakpointObserver, BreakpointState, MediaMatcher} from '@angular/cdk/layout';
import {SidenavService} from '@shell/services/sidenav.service';
import {map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy, AfterViewInit {
  @ViewChild('sidenav') private sidenav!: MatSidenav;
  mobileQuery: MediaQueryList;
  isMobile = false;
  mobileToolbarHeight = 56;
  desktopToolbarHeight = 64;

  navList = MenuList;

  private readonly mobileQueryListener: () => void;
  private destroy$ = new Subject<boolean>();

  constructor(private cdr: ChangeDetectorRef,
              public observer: BreakpointObserver,
              private media: MediaMatcher,
              public sidenavService: SidenavService) {
    this.mobileQuery = media.matchMedia('(max-width: 599px)');
    this.observer.observe('(max-width: 599px)').pipe(
      takeUntil(this.destroy$),
      map((result: BreakpointState) => this.isMobile = result.matches)
    ).subscribe();
    this.mobileQueryListener = () => cdr.detectChanges();
    this.mobileQuery.addEventListener('change', () => this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.mobileQuery.removeEventListener('change', () => this.mobileQueryListener);
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
