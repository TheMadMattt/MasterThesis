import {AfterViewChecked, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {User} from '@modules/benchmarks/models/User';
import {Timer} from '@modules/benchmarks/timer';
import {finalize, takeUntil} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {RandomUserService} from '@modules/benchmarks/services/api/random-user.service';

@Component({
  selector: 'app-random-user-generator',
  templateUrl: './random-user-generator.component.html',
  styleUrls: ['./random-user-generator.component.scss']
})
export class RandomUserGeneratorComponent implements AfterViewChecked, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  users: User[] = [];
  USER_NUMBER: number[] = [500, 1000, 5000];
  userCount = new FormControl(this.USER_NUMBER[0]);

  getUsersTimer = new Timer('getUsers');
  renderTimer = new Timer('render');
  isRendering = false;
  constructor(private userApiService: RandomUserService,
              private cdr: ChangeDetectorRef) { }

  ngAfterViewChecked(): void {
    if (this.isRendering) {
      this.renderTimer.stopTimer();
      this.isRendering = false;
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getUsers(): void {
    this.getUsersTimer.startTimer();
    this.userApiService.getUsers(this.userCount.value).pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.getUsersTimer.stopTimer();
        this.getUsersTimer.getAverageTime();
      })
    ).subscribe((data: User[]) => {
      this.renderTimer.startTimer();
      this.isRendering = true;
      this.users = data;
    });
  }

  clear(): void {
    this.users = [];
    this.renderTimer.clear();
    this.getUsersTimer.clear();
    this.isRendering = false;
  }
}
