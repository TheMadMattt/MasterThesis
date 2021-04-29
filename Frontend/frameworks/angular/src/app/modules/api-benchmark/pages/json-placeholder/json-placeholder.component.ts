import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {defer, EMPTY, Observable} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {ExcelService} from '@shared/services/excel.service';
import {Post} from '@modules/api-benchmark/models/Post';
import { Timer } from '@shared/utils/timer';
import {DialogService} from '@shared/services/dialog.service';
import {JsonPlaceholderService} from '@modules/api-benchmark/services/api/json-placeholder.service';
import {finalize, map, switchMap} from 'rxjs/operators';
import {PostDTO} from '@modules/api-benchmark/models/DTOs/PostDTO';

@Component({
  selector: 'app-json-placeholder',
  templateUrl: './json-placeholder.component.html',
  styleUrls: ['./json-placeholder.component.scss']
})
export class JsonPlaceholderComponent implements AfterViewChecked {
  posts: Post[] = [];
  selectedPost: Post = new Post();
  selectedId = new FormControl(1);
  arrayOfIds: number[] = Array.from({length: 100}, (_, i) => i + 1);

  getPostsTimer = new Timer('getPosts');
  addPostTimer = new Timer('addPost');
  getPostTimer = new Timer('getPost');
  updatePostTimer = new Timer('updatePost');
  deletePostTimer = new Timer('deletePost');
  renderTimer = new Timer('renderPosts');
  isBenchmarkRunning = false;
  constructor(private jsonPlaceholderApi: JsonPlaceholderService,
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

  openAddPostForm(): void {
    this.dialogService.openPostForm(new Post()).pipe(
      map((result: any) => result),
      switchMap((post: PostDTO) => {
        if (post) {
          return this.runCreatePostBenchmark(post);
        } else {
          return EMPTY;
        }
      })
    ).subscribe();
  }

  openEditPostForm(post: Post): void {
    this.dialogService.openPostForm(post).pipe(
      map((result: any) => result),
      switchMap((updatedPost: Post | null) => {
        if (updatedPost) {
          return this.runUpdatePostBenchmark(updatedPost);
        } else {
          return EMPTY;
        }
      }),
    ).subscribe();
  }

  getPostsWithComments(): void {
    this.runGetPostsBenchmark().subscribe(data => {
      this.isBenchmarkRunning = true;
      this.renderTimer.startTimer();
      this.posts = [...data];
    });
  }

  deleteSelectedPost(postId: number): void {
    this.runDeletePostBenchmark(postId).subscribe();
  }

  getSelectedPost(postId: number): void {
    if (postId > 0 && postId <= 100) {
      this.runGetPostBenchmark(postId).subscribe((post: Post) => {
        this.renderTimer.startTimer();
        this.isBenchmarkRunning = true;
        this.selectedPost = post;
      });
    }
  }

  editSelectedPost(postId: number): void {
    this.jsonPlaceholderApi.getPost(postId).pipe(
    ).subscribe(post => {
      this.openEditPostForm(post);
    });
  }

  runCreatePostBenchmark(post: PostDTO): Observable<Post> {
    return defer(() => {
      this.addPostTimer.startTimer();
      return this.jsonPlaceholderApi.createNewPost(post).pipe(
        finalize(() => this.addPostTimer.stopTimer())
      );
    });
  }

  runGetPostBenchmark(postId: number): Observable<Post> {
    return defer(() => {
      this.getPostTimer.startTimer();
      return this.jsonPlaceholderApi.getPost(postId).pipe(
        finalize(() => this.getPostTimer.stopTimer())
      );
    });
  }

  runGetPostsBenchmark(): Observable<Post[]> {
    return defer(() => {
      this.getPostsTimer.startTimer();
      return this.jsonPlaceholderApi.getPostsWithComments().pipe(
        finalize(() => this.getPostsTimer.stopTimer())
      );
    });
  }

  runUpdatePostBenchmark(post: Post): Observable<Post> {
    return defer(() => {
      this.updatePostTimer.startTimer();
      return this.jsonPlaceholderApi.updatePost(post).pipe(
        finalize(() => this.updatePostTimer.stopTimer())
      );
    });
  }

  runDeletePostBenchmark(postId: number): Observable<Post> {
    return defer(() => {
      this.deletePostTimer.startTimer();
      return this.jsonPlaceholderApi.deletePost(postId).pipe(
        finalize(() => this.deletePostTimer.stopTimer())
      );
    });
  }

  saveExcel(): void {
    const timers: Timer[] = [this.addPostTimer, this.getPostTimer, this.getPostsTimer,
      this.updatePostTimer, this.deletePostTimer, this.renderTimer];

    this.excelService.saveTimersToExcel(timers, 'JSON-PLACEHOLDER');
  }

  clear(): void {
    window.location.reload();
  }
}
