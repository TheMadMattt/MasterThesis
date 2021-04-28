import {Component, Input} from '@angular/core';
import {Timer} from '@shared/utils/timer';

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

  constructor() { }
}
