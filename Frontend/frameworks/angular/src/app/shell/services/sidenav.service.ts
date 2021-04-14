import { Injectable } from '@angular/core';
import {MatDrawerToggleResult, MatSidenav} from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenav!: MatSidenav;

  constructor() { }

  setSidenav(sidenav: MatSidenav): void {
    this.sidenav = sidenav;
  }

  openSidenav(): Promise<MatDrawerToggleResult> {
    return this.sidenav.open();
  }

  closeSidenav(): Promise<MatDrawerToggleResult> {
    return this.sidenav.close();
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }
}
