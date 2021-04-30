import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {getLCP, getFCP, getTTFB, Metric} from 'web-vitals';
import {BenchmarkService} from '@shared/services/benchmark.service';
import {ExcelService} from '@shared/services/excel.service';

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
  ttfbList: number[] = [];

  showAllTimes = false;
  reloadsCount = 0;
  timer!: any;

  constructor(private benchmarkService: BenchmarkService,
              private excelService: ExcelService) {
    this.reloadsCount = +JSON.parse(JSON.stringify(localStorage.getItem('reloadsCounter')));
  }

  ngAfterViewInit(): void {
    getLCP(lcp => {
      this.lcp = lcp;
      const lcpLocalStorage = localStorage.getItem('lcp');
      if (lcpLocalStorage) {
        this.lcpList = this.lcpList.concat(JSON.parse(lcpLocalStorage));
      }
      this.lcpList.push(this.lcp.value);
      localStorage.setItem('lcp', JSON.stringify(this.lcpList));
    });
    getTTFB(ttfb => {
      this.ttfb = ttfb;
      const perfData = ttfb.entries[0];
      this.pageLoaded = perfData.duration;
      const pageLoadedTimeLocalStorage = localStorage.getItem('pageLoaded');
      const ttfbTimeLocalStorage = localStorage.getItem('ttfb');

      if (pageLoadedTimeLocalStorage) {
        this.pageLoadedList = this.pageLoadedList.concat(JSON.parse(pageLoadedTimeLocalStorage));
      }
      if (ttfbTimeLocalStorage) {
        this.ttfbList = this.ttfbList.concat(JSON.parse(ttfbTimeLocalStorage));
      }
      this.pageLoadedList.push(this.pageLoaded);
      this.ttfbList.push(this.ttfb.value);
      localStorage.setItem('pageLoaded', JSON.stringify(this.pageLoadedList));
      localStorage.setItem('ttfb', JSON.stringify(this.ttfbList));
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
    this.timer = setTimeout(() => this.reload(), 1000);
  }

  runBenchmark(): void {
    this.clearLocalStorage();
    this.reloadsCount = this.benchmarkService.selectedNumberOfBenchmarks;
    this.reload();
  }

  reload(): void {
    if (this.reloadsCount > 0) {
      localStorage.setItem('reloadsCounter', (--this.reloadsCount).toString());
      window.location.reload();
    }
  }

  clearLocalStorage(): void {
    localStorage.clear();
    this.ttfbList = [];
    this.fcpList = [];
    this.lcpList = [];
    this.pageLoadedList = [];
  }

  ngOnDestroy(): void {
    clearTimeout();
  }

  saveExcel(): void {
    const times = [
      {
        title: 'fcp',
        data: this.fcpList
      },
      {
        title: 'lcp',
        data: this.lcpList
      },
      {
        title: 'ttfb',
        data: this.ttfbList,
      },
      {
        title: 'pageLoadingTime',
        data: this.pageLoadedList
      }
    ];

    this.excelService.savePageLoadingToExcel(times, 'PAGE_LOADING_TIMES');
  }
}
