import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import {Timer} from '@modules/benchmarks/timer';

export interface ExcelItem {
  lp: number | string;
  time: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  saveToExcel(timers: Timer[], workBookTitle: string): void {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    timers.forEach(timer => {
      const timerExcel: ExcelItem[] = timer.times.map((item, index) => {
        return {
          lp: index + 1,
          time: item
        };
      });
      timerExcel.push({ lp: 'average', time: timer.getAverageTime()});
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(timerExcel);

      XLSX.utils.book_append_sheet(wb, ws, timer.timerName);
    });

    XLSX.writeFile(wb, workBookTitle + '-BENCHMARK.xlsx');
  }
}
