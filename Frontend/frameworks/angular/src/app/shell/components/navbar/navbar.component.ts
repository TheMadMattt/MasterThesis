import { Component, OnInit } from '@angular/core';
import {SidenavService} from '@shell/services/sidenav.service';
import {FormControl} from '@angular/forms';
import {BenchmarkService} from '@shared/services/benchmark.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  NUMBER_OF_BENCHMARKS = [3, 5, 10, 15];
  numberOfBenchmarks = new FormControl(this.NUMBER_OF_BENCHMARKS[1]);

  constructor(public sidenavService: SidenavService,
              private benchmarkService: BenchmarkService) { }

  ngOnInit(): void {
    this.numberOfBenchmarks.valueChanges.subscribe(value => {
      this.benchmarkService.setNumberOfBenchmarks(value);
    });
  }

}
