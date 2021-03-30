import {AfterViewChecked, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {ApiService} from '@modules/benchmarks/services/api/api.service';
import {Subject} from 'rxjs';
import {ToDo} from '@modules/benchmarks/models/ToDo';
import {Timer} from '@modules/benchmarks/timer';
import {finalize, takeUntil} from 'rxjs/operators';
import {User} from '@modules/benchmarks/models/User';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-rest-api-crud',
  templateUrl: './rest-api-crud.component.html',
  styleUrls: ['./rest-api-crud.component.scss']
})
export class RestApiCrudComponent implements AfterViewChecked, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  todoList: ToDo[] = [];
  strings: string[] = [];
  users: User[] = [];

  getToDosTimer = new Timer('getToDos');
  getUsersTimer = new Timer('getUsers');
  getStringListTimer = new Timer('getStringList');
  renderTimer = new Timer('render');
  isRendering = false;
  isLocalServerDown = false;
  localServerErrorMsg: string | null = null;
  constructor(private jsonPlaceholderApi: ApiService,
              private cdr: ChangeDetectorRef) { }

  ngAfterViewChecked(): void {
    console.log('Widok Zaktualizowany');
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

  getToDos(): void {
    this.getToDosTimer.startTimer();
    this.jsonPlaceholderApi.getToDos().pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.getToDosTimer.stopTimer();
        this.getToDosTimer.getAverageTime();
      })
    ).subscribe((data: ToDo[]) => {
      this.renderTimer.startTimer();
      this.isRendering = true;
      this.todoList = data;
    });
  }

  getUsers(): void {
    this.getUsersTimer.startTimer();
    this.jsonPlaceholderApi.getUsers(2000).pipe(
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

  getListOfStringLocal(): void {
    this.getStringListTimer.startTimer();
    this.jsonPlaceholderApi.getListOfStringsLocal().pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.getStringListTimer.stopTimer();
        this.getStringListTimer.getAverageTime();
      })
    ).subscribe((data: string[]) => {
      this.renderTimer.startTimer();
      this.isRendering = true;
      this.strings = data;
    }, (error: HttpErrorResponse) => {
      this.isLocalServerDown = true;
      this.localServerErrorMsg = error.message;
    });
  }

  clear(): void {
    this.todoList = [];
    this.strings = [];
    this.users = [];
    this.getToDosTimer = new Timer('getToDos');
    this.renderTimer = new Timer('render');
    this.getUsersTimer = new Timer('getUsers');
    this.isRendering = false;
  }
}
