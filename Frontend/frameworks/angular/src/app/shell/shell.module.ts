import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import { MainComponent } from './pages/main.component';
import {RouterModule} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    SidenavComponent,
    NavItemComponent
  ],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class ShellModule { }
