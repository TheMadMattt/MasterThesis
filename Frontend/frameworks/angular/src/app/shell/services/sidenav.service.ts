import { Injectable } from '@angular/core';
import {MatDrawerToggleResult, MatSidenav} from '@angular/material/sidenav';
import {from, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenav!: MatSidenav;

  constructor() { }

  setSidenav(sidenav: MatSidenav): void {
    this.sidenav = sidenav;
  }

  openSidenav(): Observable<MatDrawerToggleResult> {
    return from(this.sidenav.open());
  }

  closeSidenav(): Observable<MatDrawerToggleResult> {
    return from(this.sidenav.close());
  }

  toggleSidenav(): void {
    from(this.sidenav.toggle());
  }
}
