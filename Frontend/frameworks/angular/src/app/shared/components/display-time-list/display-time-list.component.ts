import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Timer} from '@shared/utils/timer';

interface TimeListData {
  title: string;
  timer: Timer;
}

@Component({
  selector: 'app-display-time-list',
  templateUrl: './display-time-list.component.html',
  styleUrls: ['./display-time-list.component.scss']
})
export class DisplayTimeListComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: TimeListData) { }

  ngOnInit(): void {
  }

}
