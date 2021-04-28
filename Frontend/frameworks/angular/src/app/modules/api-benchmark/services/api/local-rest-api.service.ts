import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Task } from '@shared/models/Task';
import {TaskDTO} from '@modules/api-benchmark/models/DTOs/TaskDTO';

@Injectable({
  providedIn: 'root'
})
export class LocalRestApiService {
  private API_URL = '';

  constructor(private httpClient: HttpClient) { }

  setApiUrl(url: string): void {
    if (url.slice(-1) === '/') {
      this.API_URL = url;
    } else {
      url += '/';
      this.API_URL = url;
    }
  }

  connectToLocalRestApi(count: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + 'connect/' + count, { observe: 'response'});
  }

  createNewTask(task: TaskDTO): Observable<Task> {
    console.log(task);
    return this.httpClient.post<Task>(this.API_URL + 'task/', task);
  }

  getTask(id: number): Observable<Task> {
    return this.httpClient.get<Task>(this.API_URL + 'task/' + id);
  }

  updateTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(this.API_URL + 'task/' + task.id, task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.httpClient.delete<Task>(this.API_URL + 'task/' + id);
  }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.API_URL + 'task');
  }
}
