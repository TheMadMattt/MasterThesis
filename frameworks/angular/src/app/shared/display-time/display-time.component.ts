import {Component, Input} from '@angular/core';
import {Timer} from '@modules/benchmarks/timer';

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

  constructor() { }

}
