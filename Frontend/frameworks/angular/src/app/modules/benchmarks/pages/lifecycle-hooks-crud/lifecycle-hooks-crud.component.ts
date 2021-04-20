import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {Timer} from '@modules/benchmarks/timer';
import {DummyDataService} from '@modules/benchmarks/services/dummy-data.service';
import {FormControl} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {BenchmarkService} from '@shared/services/benchmark.service';
import {Task} from '@modules/benchmarks/models/Task';
import {ExcelService} from '@shared/services/excel.service';

@Component({
  selector: 'app-lifecycle-hooks-crud',
  templateUrl: './lifecycle-hooks-crud.component.html',
  styleUrls: ['./lifecycle-hooks-crud.component.scss']
})
export class LifecycleHooksCrudComponent implements AfterViewChecked {
  dummyData: Task[] = [];
  ROWS_NUMBER: number[] = [1000, 2000, 5000, 10000];
  BENCHMARKS_NUMBER = 0;
  rowsNumber: FormControl = new FormControl(this.ROWS_NUMBER[0]);
  selectedDummyItem: any;

  constructor(private dummyDataService: DummyDataService,
              private spinner: NgxSpinnerService,
              private cdr: ChangeDetectorRef,
              private benchmarkService: BenchmarkService,
              private excelService: ExcelService) {
    this.benchmarkService.getNumberOfBenchmarks().subscribe(value => {
      this.BENCHMARKS_NUMBER = value;
    });
  }

  private isCreating = false;
  private isUpdating = false;
  private isAppending = false;
  private isDeleting = false;
  private isReading = false;
  createTimer = new Timer('createDummyData');
  updateTimer = new Timer('updateDummyData');
  appendTimer = new Timer('appendDummyData');
  deleteTimer = new Timer('deleteDummyData');
  readTimer = new Timer('readDummyData');

  createRows(): void {
    this.isCreating = true;
    this.createTimer.startTimer();
    this.dummyData = this.dummyDataService.buildData(this.rowsNumber.value);
  }

  updateRandomRow(): void {
    this.isUpdating = true;
    const id = this.dummyDataService.random(this.dummyData.length);
    this.updateTimer.startTimer();
    const itemToUpdate = this.dummyData[id];
    itemToUpdate.title += ' UPDATED';
    itemToUpdate.description += ' UPDATED';
    this.dummyData[id] = itemToUpdate;
  }

  appendRow(): void {
    this.isAppending = true;
    this.appendTimer.startTimer();
    this.dummyData.push(this.dummyDataService.buildOneItem(this.dummyData.length));
  }

  readRandomRow(): void {
    this.isReading = true;
    const id = this.dummyDataService.random(this.dummyData.length);
    this.readTimer.startTimer();
    this.selectedDummyItem = this.dummyData[id];
  }

  deleteRandomRow(): void {
    this.isDeleting = true;
    const id = this.dummyDataService.random(this.dummyData.length);
    this.deleteTimer.startTimer();
    this.dummyData.splice(id, 1);
  }

  ngAfterViewChecked(): void {
    if (this.isCreating) {
      this.createTimer.stopTimer();
      this.isCreating = false;
    } else if (this.isUpdating) {
      this.updateTimer.stopTimer();
      this.isUpdating = false;
    } else if (this.isAppending) {
      this.appendTimer.stopTimer();
      this.isAppending = false;
    } else if (this.isDeleting) {
      this.deleteTimer.stopTimer();
      this.isDeleting = false;
    } else if (this.isReading) {
      this.readTimer.stopTimer();
      this.isReading = false;
    }
    this.cdr.detectChanges();
  }

  runCreatingBenchmark = async () => {
    await this.spinner.show('benchmark');
    for (let i = 0; i < this.BENCHMARKS_NUMBER; i++) {
      this.createRows();
      await this.delay(0);
    }
    await this.spinner.hide('benchmark');
  }

  runUpdatingBenchmark = async () => {
    await this.spinner.show('benchmark');
    for (let i = 0; i < this.BENCHMARKS_NUMBER; i++) {
      const dummyDataBeforeDelete = this.dummyData;
      this.updateRandomRow();
      await this.delay(0).then(() => {
        this.dummyData = [...dummyDataBeforeDelete];
      });
    }
    await this.spinner.hide('benchmark');
  }

  runAppendingBenchmark = async () => {
    await this.spinner.show('benchmark');
    for (let i = 0; i < this.BENCHMARKS_NUMBER; i++) {
      const dummyDataBeforeDelete = this.dummyData;
      this.appendRow();
      await this.delay(0).then(() => {
        this.dummyData = [...dummyDataBeforeDelete];
      });
    }
    await this.spinner.hide('benchmark');
  }

  runDeletingBenchmark = async () => {
    await this.spinner.show('benchmark');
    for (let i = 0; i < this.BENCHMARKS_NUMBER; i++) {
      const dummyDataBeforeDelete = this.dummyData;
      this.deleteRandomRow();
      await this.delay(0).then(() => {
        this.dummyData = [...dummyDataBeforeDelete];
      });
    }
    await this.spinner.hide('benchmark');
  }

  runReadingBenchmark = async () => {
    await this.spinner.show('benchmark');
    for (let i = 0; i < this.BENCHMARKS_NUMBER; i++) {
      this.readRandomRow();
      await this.delay(0);
    }
    await this.spinner.hide('benchmark');
  }

  delay(ms: number): Promise<any> {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  clear(): void {
    window.location.reload();
  }

  saveExcel(): void {
    const timers: Timer[] = [this.createTimer, this.readTimer, this.appendTimer,
      this.updateTimer, this.deleteTimer];

    this.excelService.saveToExcel(timers, 'LIFECYCLE-HOOKS');
  }
}
