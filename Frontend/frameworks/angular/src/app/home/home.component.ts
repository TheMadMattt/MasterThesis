import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {getLCP, getCLS, getFCP, getTTFB, Metric} from 'web-vitals';
import {BenchmarkService} from "@shared/services/benchmark.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  cls!: Metric;
  lcp!: Metric;
  fcp!: Metric;
  ttfb!: Metric;
  pageLoaded = 0;
  pageLoadedList: number[] = [];
  fcpList: number[] = [];
  lcpList: number[] = [];
  clsList: number[] = [];

  showAllTimes = false;
  reloadsCount = 0;
  timer!: any;

  constructor(private benchmarkService: BenchmarkService) {
    this.reloadsCount = +JSON.parse(JSON.stringify(localStorage.getItem('reloadsCounter')));
  }

  ngAfterViewInit(): void {
    getTTFB(ttfb => {
      this.ttfb = ttfb;
      const perfData = ttfb.entries[0];
      const pageLoadingTime = perfData.duration;
      const pageLoadedTimeLocalStorage = localStorage.getItem('pageLoaded');

      if (pageLoadedTimeLocalStorage) {
        this.pageLoadedList = this.pageLoadedList.concat(JSON.parse(pageLoadedTimeLocalStorage));
      }
      this.pageLoaded = pageLoadingTime;
      this.pageLoadedList.push(this.pageLoaded);
      localStorage.setItem('pageLoaded', JSON.stringify(this.pageLoadedList));
    });
    getFCP(fcp => {
      this.fcp = fcp;
      const fcpLocalStorage = localStorage.getItem('fcp');
      if (fcpLocalStorage) {
        this.fcpList = this.fcpList.concat(JSON.parse(fcpLocalStorage));
      }
      this.fcpList.push(this.fcp.value);
      localStorage.setItem('fcp', JSON.stringify(this.fcpList));
    }, true);
    getLCP(lcp => {
      this.lcp = lcp;
      const lcpLocalStorage = localStorage.getItem('lcp');
      if (lcpLocalStorage) {
        this.lcpList = this.lcpList.concat(JSON.parse(lcpLocalStorage));
      }
      this.lcpList.push(this.lcp.value);
      localStorage.setItem('lcp', JSON.stringify(this.lcpList));
    });
    getCLS(cls => {
      this.cls = cls;
      const clsLocalStorage = localStorage.getItem('cls');
      if (clsLocalStorage) {
        this.clsList = this.clsList.concat(JSON.parse(clsLocalStorage));
      }
      this.clsList.push(this.cls.value);
      localStorage.setItem('cls', JSON.stringify(this.clsList));
    });
    this.timer = setTimeout(() => this.reload(), 1000);
  }

  runBenchmark(): void {
    this.reloadsCount = this.benchmarkService.selectedNumberOfBenchmarks;
    localStorage.removeItem('fcp');
    localStorage.removeItem('lcp');
    localStorage.removeItem('cls');
    localStorage.removeItem('pageLoaded');
    this.reload();
  }

  reload(): void {
    if (this.reloadsCount > 0) {
      localStorage.setItem('reloadsCounter', (--this.reloadsCount).toString());
      window.location.reload();
    }
  }

  ngOnDestroy(): void {
    clearTimeout();
  }
}
