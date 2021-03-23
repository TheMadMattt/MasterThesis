import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import {BreakpointObserver, BreakpointState, MediaMatcher} from '@angular/cdk/layout';
import {MenuList} from '@shell/sidenav-menu-list';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  isMobile = false;
  mobileToolbarHeight = 56;
  desktopToolbarHeight = 64;

  navList = MenuList;

  private readonly mobileQueryListener: () => void;
  private destroy$ = new Subject<boolean>();

  constructor(private cdr: ChangeDetectorRef,
              public observer: BreakpointObserver,
              media: MediaMatcher) {
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
}
