import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {Post} from '@modules/benchmarks/models/Post';
import {PostDTO} from '@modules/benchmarks/models/DTOs/PostDTO';
import {PostFormComponent} from '@modules/benchmarks/components/post-form/post-form.component';
import {TaskDTO} from '@modules/benchmarks/models/DTOs/TaskDTO';
import { Task } from '../models/Task';
import {TaskFormComponent} from '@modules/benchmarks/components/task-form/task-form.component';

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
}
