import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {Timer} from '@modules/benchmarks/timer';
import {DialogService} from '@modules/benchmarks/services/dialog.service';
import {Task} from '@modules/benchmarks/models/Task';
import {LocalRestApiService} from '@modules/benchmarks/services/api/local-rest-api.service';
import {FormControl} from '@angular/forms';
import {finalize, map, switchMap, take} from 'rxjs/operators';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {EMPTY} from 'rxjs';
import {TaskDTO} from '@modules/benchmarks/models/DTOs/TaskDTO';

@Component({
  selector: 'app-local-rest-api-server',
  templateUrl: './local-rest-api-server.component.html',
  styleUrls: ['./local-rest-api-server.component.scss']
})
export class LocalRestApiServerComponent implements AfterViewChecked {
  tasks: Task[] = [];
  selectedTask = new Task();
  taskCount = new FormControl(1000);
  selectedId = new FormControl(1);
  localApiUrl = new FormControl('https://localhost:44306/');
  TASK_COUNT: number[] = [1000, 2000, 5000, 10000];
  isConnected = false;
  isRendering = false;
  connectionError = false;
  errorMsg = '';

  getTasksTimer = new Timer('getTasks');
  addTaskTimer = new Timer('addTask');
  getTaskTimer = new Timer('getTask');
  updateTaskTimer = new Timer('updateTask');
  deleteTaskTimer = new Timer('deleteTask');
  renderTimer = new Timer('render');

  informationOpen = false;
  constructor(private localRestApiService: LocalRestApiService,
              private cdr: ChangeDetectorRef,
              private dialogService: DialogService,
              private spinner: NgxSpinnerService) { }

  ngAfterViewChecked(): void {
    if (this.isRendering) {
      this.renderTimer.stopTimer();
      this.isRendering = false;
      this.cdr.detectChanges();
    }
  }

  addTask(): void {
    this.dialogService.openTaskForm(new Task()).pipe(
      map((result: any) => result?.task),
      take(1),
      switchMap((task: TaskDTO) => {
        if (Task) {
          this.addTaskTimer.startTimer();
          return this.localRestApiService.createNewTask(task);
        } else {
          return EMPTY;
        }
      }),
      finalize(() => this.addTaskTimer.stopTimer())
    ).subscribe();
  }

  editTask(task: Task): void {
    this.dialogService.openTaskForm(task).pipe(
      map((result: any) => result?.task),
      take(1),
      switchMap((updatedTask: Task) => {
        if (updatedTask) {
          this.updateTaskTimer.startTimer();
          return this.localRestApiService.updateTask(updatedTask);
        } else {
          return EMPTY;
        }
      }),
      finalize(() => this.updateTaskTimer.stopTimer())
    ).subscribe();
  }

  deleteTask(TaskId: number): void {
    this.deleteTaskTimer.startTimer();
    this.localRestApiService.deleteTask(TaskId).pipe(
      take(1),
      finalize(() => this.deleteTaskTimer.stopTimer())
    ).subscribe();
  }

  getTask(TaskId: number): void {
    if (TaskId > 0 && TaskId <= 100) {
      this.getTaskTimer.startTimer();
      this.localRestApiService.getTask(TaskId).pipe(
        take(1),
        finalize(() => this.getTaskTimer.stopTimer())
      ).subscribe((task: Task) => {
        this.renderTimer.startTimer();
        this.isRendering = true;
        this.selectedTask = task;
      });
    }
  }

  getTasks(): void {
    this.getTasksTimer.startTimer();
    this.localRestApiService.getTasks().pipe(
      take(1),
      finalize(() => this.getTasksTimer.stopTimer())
    ).subscribe(data => {
      this.isRendering = true;
      this.renderTimer.startTimer();
      this.tasks = data;
    });
  }

  updateTask(taskId: number): void {
    this.localRestApiService.getTask(taskId).pipe(
      take(1)
    ).subscribe(task => {
      this.editTask(task);
    });
  }

  clear(): void {
    window.location.reload();
  }

  connectToLocalApi(): void {
    this.spinner.show('local-rest-api-benchmark');
    this.localRestApiService.setApiUrl(this.localApiUrl.value);
    this.localRestApiService.connectToLocalRestApi(+this.taskCount.value)
      .pipe(
        take(1),
        finalize(() => this.spinner.hide('local-rest-api-benchmark'))
      )
      .subscribe((connectResponse: HttpResponse<any>) => {
        this.isConnected = connectResponse.ok;
        if (connectResponse.ok) {
          this.localApiUrl.disable();
          this.taskCount.disable();
          this.connectionError = false;
        }
      }, (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMsg = `Can't connect to local server`;
        this.connectionError = true;
      });
  }

  disconnectFromLocalApi(): void {
    this.isConnected = false;
    this.localApiUrl.enable();
    this.taskCount.enable();
    this.connectionError = false;
  }
}
