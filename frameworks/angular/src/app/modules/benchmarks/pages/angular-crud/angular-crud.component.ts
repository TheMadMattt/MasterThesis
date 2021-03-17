import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {Timer} from "@modules/benchmarks/timer";

@Component({
  selector: 'app-angular-crud',
  templateUrl: './angular-crud.component.html',
  styleUrls: ['./angular-crud.component.scss']
})
export class AngularCrudComponent implements AfterViewChecked {
  array: any[] = [];
  ROWS_NUMBER = 1000;

  constructor(private cdr: ChangeDetectorRef) { }

  isCreating = false;
  createRenderTime: Timer = new Timer();

  create1000rows(): void {
    this.isCreating = true;
    this.createRenderTime.startTimer();
    for (let i = 0; i < this.ROWS_NUMBER; i++) {
      this.array.push({
        name: 'TEST: ' + i,
        desc: 'DESC ' + i
      });
    }
  }

  ngAfterViewChecked(): void {
    if (this.isCreating) {
      this.createRenderTime.stopTimer();
      this.isCreating = false;
      this.cdr.detectChanges();
    }
  }

  clear(): void {
    this.array = [];
    this.createRenderTime = new Timer();
  }

  async run5Times() {
    for (let i = 0; i < 5; i++) {
      this.create1000rows();
      await this.delay(2000).then(() => this.array = []);
    }
    this.createRenderTime.getAverageTime();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
