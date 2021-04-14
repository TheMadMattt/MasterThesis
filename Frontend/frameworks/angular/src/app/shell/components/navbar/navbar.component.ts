import { Component, OnInit } from '@angular/core';
import {SidenavService} from '@shell/services/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public sidenavService: SidenavService) { }

  ngOnInit(): void {
  }

}
