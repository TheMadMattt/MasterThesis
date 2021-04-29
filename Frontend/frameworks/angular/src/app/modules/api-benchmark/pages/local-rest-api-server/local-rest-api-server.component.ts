import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {finalize, map, switchMap} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {defer, EMPTY, Observable} from 'rxjs';
import {ExcelService} from '@shared/services/excel.service';
import {Task} from '@shared/models/Task';
import {DialogService} from '@shared/services/dialog.service';
import {Timer} from '@shared/utils/timer';
import {TaskDTO} from '@modules/api-benchmark/models/DTOs/TaskDTO';
import {LocalRestApiService} from '@modules/api-benchmark/services/api/local-rest-api.service';

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
  isBenchmarkRunning = false;

  connectionError = false;
  connectionErrorMsg = '';

  isIdCorrect = false;
  idErrorMsg = '';

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
              private spinner: NgxSpinnerService,
              private excelService: ExcelService) {
  }

  ngAfterViewChecked(): void {
    if (this.isBenchmarkRunning) {
      this.renderTimer.stopTimer();
      this.isBenchmarkRunning = false;
      this.cdr.detectChanges();
    }
  }

  addTask(): void {
    this.dialogService.openTaskForm(new Task()).pipe(
      map((result: any) => result),
      switchMap((task: TaskDTO) => {
        if (Task) {
          return this.runCreatingTaskBenchmark(task);
        } else {
          return EMPTY;
        }
      })
    ).subscribe();
  }

  editSelectedTask(task: Task): void {
    this.dialogService.openTaskForm(task).pipe(
      map((result: any) => result),
      switchMap((updatedTask: Task) => {
        if (updatedTask) {
          return this.runUpdateTaskBenchmark(updatedTask);
        } else {
          return EMPTY;
        }
      })
    ).subscribe();
  }

  deleteSelectedTask(taskId: number): void {
    this.isIdCorrect = true;
    this.runDeleteTaskBenchmark(taskId).subscribe(
      () => {},
      () => {
      this.idErrorMsg = 'Id was not found';
      this.isIdCorrect = false;
    });
  }

  getSelectedTask(taskId: number): void {
    if (taskId > 0 && taskId <= +this.taskCount.value) {
      this.isIdCorrect = true;
      this.runGetTaskBenchmark(taskId).subscribe((task: Task) => {
        this.selectedTask = task;
      }, () => {
        this.idErrorMsg = 'Id was not found';
        this.isIdCorrect = false;
      });
    }
  }

  getTaskList(): void {
    this.runGetTasksBenchmark().subscribe(data => {
      this.isBenchmarkRunning = true;
      this.renderTimer.startTimer();
      this.tasks = data;
    });
  }

  openEditTaskForm(taskId: number): void {
    this.isIdCorrect = true;
    this.localRestApiService.getTask(taskId).pipe(
    ).subscribe(task => {
      this.editSelectedTask(task);
    }, () => {
      this.idErrorMsg = 'Id was not found';
      this.isIdCorrect = false;
    });
  }

  runCreatingTaskBenchmark(taskDTO: TaskDTO): Observable<Task> {
    return defer(() => {
      this.addTaskTimer.startTimer();
      return this.localRestApiService.createNewTask(taskDTO).pipe(
        finalize(() => this.addTaskTimer.stopTimer())
      );
    });
  }

  runGetTaskBenchmark(taskId: number): Observable<Task> {
    return defer(() => {
      this.getTaskTimer.startTimer();
      return this.localRestApiService.getTask(taskId).pipe(
        finalize(() => this.getTaskTimer.stopTimer())
      );
    });
  }

  runGetTasksBenchmark(): Observable<Task[]> {
    return defer(() => {
      this.getTasksTimer.startTimer();
      return this.localRestApiService.getTasks().pipe(
        finalize(() => this.getTasksTimer.stopTimer())
      );
    });
  }

  runUpdateTaskBenchmark(task: Task): Observable<Task> {
    return defer(() => {
      this.updateTaskTimer.startTimer();
      return this.localRestApiService.updateTask(task).pipe(
        finalize(() => this.updateTaskTimer.stopTimer())
      );
    });
  }

  runDeleteTaskBenchmark(taskId: number): Observable<Task> {
    return defer(() => {
      this.deleteTaskTimer.startTimer();
      return this.localRestApiService.deleteTask(taskId).pipe(
        finalize(() => this.deleteTaskTimer.stopTimer())
      );
    });
  }

  clear(): void {
    window.location.reload();
  }

  connectToLocalApi(): void {
    this.spinner.show('local-rest-api-benchmark-connection');
    this.connectionError = false;
    this.localRestApiService.setApiUrl(this.localApiUrl.value);
    this.localRestApiService.connectToLocalRestApi(+this.taskCount.value)
      .pipe(
        finalize(() => this.spinner.hide('local-rest-api-benchmark-connection'))
      )
      .subscribe((connectResponse: HttpResponse<any>) => {
        this.isConnected = connectResponse.ok;
        if (connectResponse.ok) {
          this.localApiUrl.disable();
          this.taskCount.disable();
          this.connectionError = false;
        }
      }, () => {
        this.connectionErrorMsg = `Can't connect to local server`;
        this.connectionError = true;
      });
  }

  disconnectFromLocalApi(): void {
    this.isConnected = false;
    this.localApiUrl.enable();
    this.taskCount.enable();
    this.connectionError = false;
    this.tasks = [];
  }

  saveExcel(): void {
    const timers: Timer[] = [this.addTaskTimer, this.getTaskTimer, this.getTasksTimer,
      this.updateTaskTimer, this.deleteTaskTimer, this.renderTimer];

    this.excelService.saveTimersToExcel(timers, 'JSON-PLACEHOLDER');
  }
}
