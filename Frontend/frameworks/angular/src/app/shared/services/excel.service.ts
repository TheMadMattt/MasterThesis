import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import {Timer} from '@shared/utils/timer';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  saveTimersToExcel(timers: Timer[], workBookTitle: string): void {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    timers.forEach(timer => {
      const rowsNumberStringList: string[] = timer.rowsNumberList.map(value => String(value));
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([{}], {header: rowsNumberStringList});
      timer.rowsNumberList.forEach((rowsNumber, x) => {
        timer.timesList[rowsNumber].times.forEach((time, y) => {
          XLSX.utils.sheet_add_json(ws, [{ rowsNumber: time }],
            { skipHeader: true, origin: { r: y + 1 , c: x} });
        });
      });
      XLSX.utils.book_append_sheet(wb, ws, timer.timerName);
    });

    XLSX.writeFile(wb, workBookTitle + '-BENCHMARK.xlsx');
  }

  savePageLoadingToExcel(loadingTimes: any[], workBookTitle: string): void {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    loadingTimes.forEach(times => {
      const timerExcel = times.data.map((item: number, index: number) => {
        return {
          lp: index + 1,
          time: item
        };
      });
      timerExcel.push({ lp: 'average', time: this.getAverageTime(times.data)});
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(timerExcel);

      XLSX.utils.book_append_sheet(wb, ws, times.title);
    });

    XLSX.writeFile(wb, workBookTitle + '-BENCHMARK.xlsx');
  }

  getAverageTime(times: number[]): number {
    const sum = times.reduce((a, b) => a + b);
    return (sum / times.length);
  }
}
