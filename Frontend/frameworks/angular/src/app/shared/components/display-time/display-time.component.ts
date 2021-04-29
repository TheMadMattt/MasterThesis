import {Component, Input} from '@angular/core';
import {Timer} from '@shared/utils/timer';
import {DialogService} from '@shared/services/dialog.service';

@Component({
  selector: 'app-display-time',
  templateUrl: './display-time.component.html',
  styleUrls: ['./display-time.component.scss']
})
export class DisplayTimeComponent {
  @Input()
  title!: string;

  @Input()
  timer!: Timer;

  @Input()
  isError = false;

  @Input()
  errorMessage!: string | null;

  showAllTimes = false;

  constructor(private dialogService: DialogService) { }

  openTimeList(): void {
    this.dialogService.openTimeList(this.title, this.timer);
  }
}
