import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {ExcelService} from '@shared/services/excel.service';
import {DummyDataService} from '@modules/lifecycle-benchmark/services/dummy-data.service';
import {Timer} from '@shared/utils/timer';
import { Task } from '@shared/models/Task';

@Component({
  selector: 'app-lifecycle-hooks-crud',
  templateUrl: './lifecycle-hooks-crud.component.html',
  styleUrls: ['./lifecycle-hooks-crud.component.scss']
})
export class LifecycleHooksCrudComponent implements AfterViewChecked {
  dummyData: Task[] = [];
  ROWS_NUMBER: number[] = [1000, 2000, 5000, 10000];
  rowsNumber: FormControl = new FormControl(this.ROWS_NUMBER[0]);
  selectedDummyItem: any;

  constructor(private dummyDataService: DummyDataService,
              private spinner: NgxSpinnerService,
              private cdr: ChangeDetectorRef,
              private excelService: ExcelService) {
    this.setRowsCountInTimers(this.ROWS_NUMBER[0]);
    this.rowsNumber.valueChanges.subscribe(value => this.setRowsCountInTimers(value));
  }

  private isCreating = false;
  private isUpdating = false;
  private isUpdatingAllRows = false;
  private isAppending = false;
  private isSwapping = false;
  private isDeleting = false;
  private isDeletingAllRows = false;
  private isReading = false;
  createTimer = new Timer('createDummyData');
  updateTimer = new Timer('updateDummyData');
  updateAllRowsTimer = new Timer('updateAllRowsDummyData');
  appendTimer = new Timer('appendDummyData');
  swapTimer = new Timer('swapDummyData');
  deleteTimer = new Timer('deleteDummyData');
  deleteAllRowsTimer = new Timer('deleteAllDummyData');
  readTimer = new Timer('readDummyData');

  createRows = async () => {
    this.dummyData = [];
    await this.delay(0);
    this.createTimer.startTimer();
    this.isCreating = true;
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

  updateAllRows = async () => {
    this.dummyData = this.dummyDataService.buildData(this.rowsNumber.value);
    await this.delay(0);
    this.isUpdatingAllRows = true;
    this.updateAllRowsTimer.startTimer();
    for (const data of this.dummyData) {
      data.title += ' UPDATED';
      data.description += ' UPDATED';
    }
  }

  appendRows = async () => {
    this.dummyData = this.dummyDataService.buildData(this.rowsNumber.value);
    await this.delay(0);
    this.appendTimer.startTimer();
    this.isAppending = true;
    this.dummyData = this.dummyData.concat(this.dummyDataService.buildData(1000));
  }

  swapRows = async () => {
    this.dummyData = this.dummyDataService.buildData(this.rowsNumber.value);
    await this.delay(0);
    this.swapTimer.startTimer();
    this.isSwapping = true;
    const temp = this.dummyData[0];
    this.dummyData[0] = this.dummyData[this.dummyData.length - 1];
    this.dummyData[this.dummyData.length - 1] = temp;
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

  deleteAllRows = async () => {
    this.dummyData = this.dummyDataService.buildData(this.rowsNumber.value);
    await this.delay(0);
    this.isDeletingAllRows = true;
    this.deleteAllRowsTimer.startTimer();
    this.dummyData = [];
  }

  ngAfterViewChecked(): void {
    if (this.isCreating) {
      this.createTimer.stopTimer();
      this.isCreating = false;
    } else if (this.isUpdating) {
      this.updateTimer.stopTimer();
      this.isUpdating = false;
    } else if (this.isUpdatingAllRows) {
      this.updateAllRowsTimer.stopTimer();
      this.isUpdatingAllRows = false;
    } else if (this.isAppending) {
      this.appendTimer.stopTimer();
      this.isAppending = false;
    } else if (this.isSwapping) {
      this.swapTimer.stopTimer();
      this.isSwapping = false;
    } else if (this.isDeleting) {
      this.deleteTimer.stopTimer();
      this.isDeleting = false;
    } else if (this.isDeletingAllRows) {
      this.deleteAllRowsTimer.stopTimer();
      this.isDeletingAllRows = false;
    } else if (this.isReading) {
      this.readTimer.stopTimer();
      this.isReading = false;
    }
    this.cdr.detectChanges();
  }

  delay(ms: number): Promise<any> {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  clear(): void {
    window.location.reload();
  }

  saveExcel(): void {
    const timers: Timer[] = [this.createTimer, this.readTimer, this.appendTimer,
      this.updateTimer, this.updateAllRowsTimer, this.deleteTimer, this.deleteAllRowsTimer, this.swapTimer];

    this.excelService.saveTimersToExcel(timers, 'LIFECYCLE-HOOKS');
  }

  setRowsCountInTimers(rowsCount: number): void {
    const timers: Timer[] = [this.readTimer, this.createTimer, this.appendTimer,
      this.updateTimer, this.updateAllRowsTimer, this.deleteTimer, this.deleteAllRowsTimer, this.swapTimer];

    timers.forEach(timer => {
      timer.setRowsNumber(rowsCount);
    });
  }
}
