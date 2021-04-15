import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {Timer} from '@modules/benchmarks/timer';
import {DummyData, DummyDataService} from '@modules/benchmarks/services/dummy-data.service';
import {FormControl} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-lifecycle-hooks-crud',
  templateUrl: './lifecycle-hooks-crud.component.html',
  styleUrls: ['./lifecycle-hooks-crud.component.scss']
})
export class LifecycleHooksCrudComponent implements AfterViewChecked {
  dummyData: DummyData[] = [];
  ROWS_NUMBER: number[] = [1000, 5000, 10000];
  BENCHMARKS_NUMBER = 10;
  rowsNumber: FormControl = new FormControl(this.ROWS_NUMBER[0]);
  selectedDummyItem: any;

  constructor(private dummyDataService: DummyDataService,
              private spinner: NgxSpinnerService,
              private cdr: ChangeDetectorRef) { }

  private isCreating = false;
  private isUpdating = false;
  private isAppending = false;
  private isDeleting = false;
  private isReading = false;
  createTimer = new Timer('create');
  updateTimer = new Timer('update');
  appendTimer = new Timer('append');
  deleteTimer = new Timer('delete');
  readTimer = new Timer('read');

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
    itemToUpdate.name += ' UPDATED';
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
    await this.spinner.show('lifecycle-benchmark');
    for (let i = 0; i < this.BENCHMARKS_NUMBER; i++) {
      this.createRows();
      await this.delay(0);
    }
    await this.spinner.hide('lifecycle-benchmark');
  }

  runUpdatingBenchmark = async () => {
    await this.spinner.show('lifecycle-benchmark');
    for (let i = 0; i < this.BENCHMARKS_NUMBER; i++) {
      const dummyDataBeforeDelete = this.dummyData;
      this.updateRandomRow();
      await this.delay(0).then(() => {
        this.dummyData = [...dummyDataBeforeDelete];
      });
    }
    await this.spinner.hide('lifecycle-benchmark');
  }

  runAppendingBenchmark = async () => {
    await this.spinner.show('lifecycle-benchmark');
    for (let i = 0; i < this.BENCHMARKS_NUMBER; i++) {
      const dummyDataBeforeDelete = this.dummyData;
      this.appendRow();
      await this.delay(0).then(() => {
        this.dummyData = [...dummyDataBeforeDelete];
      });
    }
    await this.spinner.hide('lifecycle-benchmark');
  }

  runDeletingBenchmark = async () => {
    await this.spinner.show('lifecycle-benchmark');
    for (let i = 0; i < this.BENCHMARKS_NUMBER; i++) {
      const dummyDataBeforeDelete = this.dummyData;
      this.deleteRandomRow();
      await this.delay(0).then(() => {
        this.dummyData = [...dummyDataBeforeDelete];
      });
    }
    await this.spinner.hide('lifecycle-benchmark');
  }

  runReadingBenchmark = async () => {
    await this.spinner.show('lifecycle-benchmark');
    for (let i = 0; i < this.BENCHMARKS_NUMBER; i++) {
      this.readRandomRow();
      await this.delay(0);
    }
    await this.spinner.hide('lifecycle-benchmark');
  }

  delay(ms: number): Promise<any> {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  clear(): void {
    window.location.reload();
  }
}
