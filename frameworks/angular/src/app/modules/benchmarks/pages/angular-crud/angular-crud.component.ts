import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';

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
  createTime = 0;
  createRenderTime = 0;
  createRenderTimeArr: number[] = [];
  create1000rows(): void {
    this.isCreating = true;
    this.createTime = performance.now();
    this.createRenderTime = performance.now();
    for (let i = 0; i < this.ROWS_NUMBER; i++) {
      this.array.push({
        name: 'TEST: ' + i,
        desc: 'DESC ' + i
      });
    }
    this.createTime = performance.now() - this.createTime
  }

  ngAfterViewChecked(): void {
    if (this.isCreating) {
      this.createRenderTime = performance.now() - this.createRenderTime;
      this.createRenderTimeArr.push(this.createRenderTime);
      this.array = [];
      this.isCreating = false;
      this.cdr.detectChanges();
    }
  }

  clear(): void {
    this.array = [];
    this.createRenderTimeArr = [];
    this.createTime = 0;
    this.createRenderTime = 0;
  }

  async run5Times() {
    for (let i = 0; i < 5; i++) {
      this.create1000rows();
      await this.delay(2000);
    }
    const sum = this.createRenderTimeArr.reduce((a, b) => a + b, 0);
    const avg = (sum / this.createRenderTimeArr.length) || 0;
    this.createRenderTime = avg;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
