import {AfterViewInit, Component, OnInit} from '@angular/core';
import {getLCP, getCLS, getFCP, getTTFB, Metric} from 'web-vitals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  cls!: Metric;
  lcp!: Metric;
  fcp!: Metric;
  fp!: any;
  ttfb!: Metric;
  totalPageLoadTime!: any;
  pageRenderTime!: any;
  startLoadingTime = 0;
  endLoadingTime = 0;

  showAllTimes = false;

  constructor() {
    this.startLoadingTime = performance.now();
  }

  ngOnInit(): void {
    const observer = new PerformanceObserver(list => {
      list.getEntries().forEach(({name, startTime, duration}) => {
        if (name === 'first-paint') {
          this.fp = {
            name: 'FP',
            value: startTime
          };
        }
      });
    });

    observer.observe({
      entryTypes: ['paint', 'first-input']
    });

    getCLS(value => {
      this.cls = value;
    }, true);
    getLCP(value => {
      this.lcp = value;
    }, true);
    getFCP(value => {
      this.fcp = value;
    }, true);
    getTTFB(value => {
      this.ttfb = value;
      const perfData: any = this.ttfb.entries[0];
      this.pageRenderTime = {
        name: 'Page render time',
        value: perfData.domComplete
      };
    });
  }

  ngAfterViewInit(): void {
    this.endLoadingTime = performance.now();
    this.totalPageLoadTime = {
      name: 'Total Page load time',
      value: this.endLoadingTime - this.startLoadingTime
    };
  }
}
