import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {Timer} from '@modules/benchmarks/timer';
import {DialogService} from '@modules/benchmarks/services/dialog.service';
import {Task} from '@modules/benchmarks/models/Task';
import {LocalRestApiService} from '@modules/benchmarks/services/api/local-rest-api.service';
import {FormControl} from '@angular/forms';
import {finalize, map, repeat, switchMap} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {defer, EMPTY, Observable} from 'rxjs';
import {TaskDTO} from '@modules/benchmarks/models/DTOs/TaskDTO';
import {BenchmarkService} from '@shared/services/benchmark.service';
import {ExcelService} from '@shared/services/excel.service';

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
  BENCHMARKS_NUMBER = 0;
  isConnected = false;
  isRendering = false;

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
              private benchmarkService: BenchmarkService,
              private excelService: ExcelService) {
    this.benchmarkService.getNumberOfBenchmarks().subscribe(value => {
      this.BENCHMARKS_NUMBER = value;
    });
  }

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

  editSelectedTask(task: Task): void {
    this.dialogService.openTaskForm(task).pipe(
      map((result: any) => result?.task),
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

  deleteSelectedTask(taskId: number): void {
    this.isIdCorrect = true;
    this.deleteTaskTimer.startTimer();
    this.localRestApiService.deleteTask(taskId).pipe(
      finalize(() => this.deleteTaskTimer.stopTimer())
    ).subscribe(
      () => {},
      () => {
      this.idErrorMsg = 'Id was not found';
      this.isIdCorrect = false;
    });
  }

  getSelectedTask(taskId: number): void {
    if (taskId > 0 && taskId <= +this.taskCount.value) {
      this.isIdCorrect = true;
      this.getTaskTimer.startTimer();
      this.localRestApiService.getTask(taskId).pipe(
        finalize(() => this.getTaskTimer.stopTimer())
      ).subscribe((task: Task) => {
        this.renderTimer.startTimer();
        this.isRendering = true;
        this.selectedTask = task;
      }, () => {
        this.idErrorMsg = 'Id was not found';
        this.isIdCorrect = false;
      });
    }
  }

  getTaskList(): void {
    this.getTasksTimer.startTimer();
    this.localRestApiService.getTasks().pipe(
      finalize(() => this.getTasksTimer.stopTimer())
    ).subscribe(data => {
      this.isRendering = true;
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

  createTask(taskDTO: TaskDTO): Observable<Task> {
    return defer(() => {
      this.addTaskTimer.startTimer();
      return this.localRestApiService.createNewTask(taskDTO).pipe(
        finalize(() => this.addTaskTimer.stopTimer())
      );
    });
  }

  getTask(taskId: number): Observable<Task> {
    return defer(() => {
      this.getTaskTimer.startTimer();
      return this.localRestApiService.getTask(taskId).pipe(
        finalize(() => this.getTaskTimer.stopTimer())
      );
    });
  }

  getTasks(): Observable<Task[]> {
    return defer(() => {
      this.getTasksTimer.startTimer();
      return this.localRestApiService.getTasks().pipe(
        finalize(() => this.getTasksTimer.stopTimer())
      );
    });
  }

  updateTask(task: Task): Observable<Task> {
    return defer(() => {
      this.updateTaskTimer.startTimer();
      return this.localRestApiService.updateTask(task).pipe(
        finalize(() => this.updateTaskTimer.stopTimer())
      );
    });
  }

  deleteTask(taskId: number): Observable<Task> {
    return defer(() => {
      this.deleteTaskTimer.startTimer();
      return this.localRestApiService.deleteTask(taskId).pipe(
        finalize(() => this.deleteTaskTimer.stopTimer())
      );
    });
  }

  deleteTaskBenchmark(taskId: number): Observable<Task> {
    return defer(() => {
      this.deleteTaskTimer.startTimer();
      taskId += 1;
      console.log(taskId);
      if (taskId >= +this.taskCount.value) {
        taskId = 0;
      }
      return this.localRestApiService.deleteTask(taskId).pipe(
        finalize(() => this.deleteTaskTimer.stopTimer())
      );
    });
  }

  runAddTaskBenchmark = async () => {
    await this.spinner.show('benchmark');
    this.createTask({
      title: 'Benchmark CREATE',
      description: `Running ${this.BENCHMARKS_NUMBER} benchmarks`,
      completed: false
    }).pipe(
      repeat(this.BENCHMARKS_NUMBER),
      finalize(() => this.spinner.hide('benchmark'))
    ).subscribe();
  }

  runUpdateTaskBenchmark = async () => {
    await this.spinner.show('benchmark');
    const task = new Task();
    task.setTask(
      Math.floor(Math.random() * 100) + 1,
      'Benchmark UPDATE',
      `Running ${this.BENCHMARKS_NUMBER} benchmarks`,
      false);
    this.updateTask(task).pipe(
      repeat(this.BENCHMARKS_NUMBER),
      finalize(() => this.spinner.hide('benchmark'))
    ).subscribe();
  }

  runGetTaskBenchmark = async () => {
    await this.spinner.show('benchmark');
    const taskId = Math.floor(Math.random() * 100) + 1;
    this.getTask(taskId).pipe(
      repeat(this.BENCHMARKS_NUMBER),
      finalize(() => this.spinner.hide('benchmark'))
    ).subscribe(data => {
      this.renderTimer.startTimer();
      this.isRendering = true;
      this.selectedTask = data;
    });
  }

  runGetTasksBenchmark = async () => {
    await this.spinner.show('benchmark');
    this.getTasks().pipe(
      repeat(this.BENCHMARKS_NUMBER),
      finalize(() => this.spinner.hide('benchmark'))
    ).subscribe(data => {
      this.renderTimer.startTimer();
      this.isRendering = true;
      this.tasks = data;
    });
  }

  runDeleteTaskBenchmark = async () => {
    await this.spinner.show('benchmark');
    const taskId = Math.floor(Math.random() * 100) + 1;
    this.deleteTaskBenchmark(taskId).pipe(
      repeat(this.BENCHMARKS_NUMBER),
      finalize(() => this.spinner.hide('benchmark'))
    ).subscribe();
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
  }

  saveExcel(): void {
    const timers: Timer[] = [this.addTaskTimer, this.getTaskTimer, this.getTasksTimer,
      this.updateTaskTimer, this.deleteTaskTimer, this.renderTimer];

    this.excelService.saveToExcel(timers, 'JSON-PLACEHOLDER');
  }
}
