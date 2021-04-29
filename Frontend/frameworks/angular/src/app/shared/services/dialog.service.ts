import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {PostFormComponent} from '@modules/api-benchmark/components/post-form/post-form.component';
import {Post} from '@modules/api-benchmark/models/Post';
import {PostDTO} from '@modules/api-benchmark/models/DTOs/PostDTO';
import {TaskFormComponent} from '@modules/api-benchmark/components/task-form/task-form.component';
import {TaskDTO} from '@modules/api-benchmark/models/DTOs/TaskDTO';
import {Task} from '@shared/models/Task';
import {DisplayTimeListComponent} from '@shared/components/display-time-list/display-time-list.component';
import {Timer} from '@shared/utils/timer';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openPostForm(post: Post | null): Observable<PostDTO | Post | null> {
    return this.dialog.open(PostFormComponent, {
      data: post,
    }).afterClosed();
  }

  openTaskForm(task: Task | null): Observable<TaskDTO | Task | null> {
    return this.dialog.open(TaskFormComponent, {
      data: task,
    }).afterClosed();
  }

  openTimeList(title: string, timer: Timer): Observable<any> {
    return this.dialog.open(DisplayTimeListComponent, {
      data: {
        title,
        timer
      }
    }).afterClosed();
  }
}
