import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {Timer} from '@modules/benchmarks/timer';
import {JsonPlaceholderService} from '@modules/benchmarks/services/api/json-placeholder.service';
import {delay, finalize, map, repeat, switchMap, take} from 'rxjs/operators';
import {Post} from '@modules/benchmarks/models/Post';
import {DialogService} from '@modules/benchmarks/services/dialog.service';
import {PostDTO} from '@modules/benchmarks/models/DTOs/PostDTO';
import {FormControl} from '@angular/forms';
import {defer, EMPTY, Observable} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

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
  BENCHMARKS_NUMBER = 10;

  getPostsTimer = new Timer('getPosts');
  addPostTimer = new Timer('addPost');
  getPostTimer = new Timer('getPost');
  updatePostTimer = new Timer('updatePost');
  deletePostTimer = new Timer('deletePost');
  renderTimer = new Timer('render');
  isRendering = false;
  constructor(private jsonPlaceholderApi: JsonPlaceholderService,
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

  getPostsWithComments(): void {
    this.getPosts().subscribe(data => {
      this.isRendering = true;
      this.renderTimer.startTimer();
      this.posts = [...data];
    });
  }

  addPost(): void {
    this.dialogService.openPostForm(new Post()).pipe(
      map((result: any) => result?.post),
      switchMap((post: PostDTO) => {
        if (post) {
          return this.createPost(post);
        } else {
          return EMPTY;
        }
      }),
      finalize(() => this.addPostTimer.stopTimer())
    ).subscribe();
  }

  editSelectedPost(post: Post): void {
    this.dialogService.openPostForm(post).pipe(
      map((result: any) => result?.post),
      switchMap((updatedPost: Post) => {
        if (updatedPost) {
          return this.updatePost(updatedPost);
        } else {
          return EMPTY;
        }
      }),
      finalize(() => this.updatePostTimer.stopTimer())
    ).subscribe();
  }

  deleteSelectedPost(postId: number): void {
    this.deletePost(postId).subscribe();
  }

  getSelectedPost(postId: number): void {
    if (postId > 0 && postId <= 100) {
      this.getPost(postId).subscribe((post: Post) => {
        this.renderTimer.startTimer();
        this.isRendering = true;
        this.selectedPost = post;
      });
    }
  }

  openEditPostForm(postId: number): void {
    this.jsonPlaceholderApi.getPost(postId).pipe(
    ).subscribe(post => {
      this.editSelectedPost(post);
    });
  }

  createPost(post: PostDTO): Observable<Post> {
    return defer(() => {
      this.addPostTimer.startTimer();
      return this.jsonPlaceholderApi.createNewPost(post).pipe(
        finalize(() => this.addPostTimer.stopTimer())
      );
    });
  }

  getPost(postId: number): Observable<Post> {
    return defer(() => {
      this.getPostTimer.startTimer();
      if (postId === -1) {
        postId = Math.floor(Math.random() * 100) + 1;
      }
      return this.jsonPlaceholderApi.getPost(postId).pipe(
        finalize(() => this.getPostTimer.stopTimer())
      );
    });
  }

  getPosts(): Observable<Post[]> {
    return defer(() => {
      this.getPostsTimer.startTimer();
      return this.jsonPlaceholderApi.getPostsWithComments().pipe(
        finalize(() => this.getPostsTimer.stopTimer())
      );
    });
  }

  updatePost(post: Post): Observable<Post> {
    return defer(() => {
      this.updatePostTimer.startTimer();
      return this.jsonPlaceholderApi.updatePost(post).pipe(
        finalize(() => this.updatePostTimer.stopTimer())
      );
    });
  }

  deletePost(postId: number): Observable<Post> {
    return defer(() => {
      this.deletePostTimer.startTimer();
      return this.jsonPlaceholderApi.deletePost(postId).pipe(
        finalize(() => this.deletePostTimer.stopTimer())
      );
    });
  }

  runAddPostBenchmark = async () => {
    await this.spinner.show('json-placeholder-benchmark');
    this.createPost(
      {
        title: 'Benchmark CREATE',
        body: `Running ${this.BENCHMARKS_NUMBER} benchmarks`,
      }).pipe(
      repeat(this.BENCHMARKS_NUMBER),
      finalize(() => this.spinner.hide('json-placeholder-benchmark'))
    ).subscribe();
  }

  runUpdatePostBenchmark = async () => {
    await this.spinner.show('json-placeholder-benchmark');
    const post = new Post();
    post.setPost(
      Math.floor(Math.random() * 100) + 1,
      'Benchmark UPDATE',
      `Running ${this.BENCHMARKS_NUMBER} benchmarks`);
    this.updatePost(post).pipe(
      repeat(this.BENCHMARKS_NUMBER),
      finalize(() => this.spinner.hide('json-placeholder-benchmark'))
    ).subscribe();
  }

  runGetPostBenchmark = async () => {
    await this.spinner.show('json-placeholder-benchmark');
    const postId = Math.floor(Math.random() * 100) + 1;
    this.getPost(postId).pipe(
      repeat(this.BENCHMARKS_NUMBER),
      finalize(() => this.spinner.hide('json-placeholder-benchmark'))
    ).subscribe(data => {
      this.renderTimer.startTimer();
      this.isRendering = true;
      this.selectedPost = data;
    });
  }

  runGetPostsBenchmark = async () => {
    await this.spinner.show('json-placeholder-benchmark');
    this.getPosts().pipe(
      repeat(this.BENCHMARKS_NUMBER),
      finalize(() => this.spinner.hide('json-placeholder-benchmark'))
    ).subscribe(data => {
      this.renderTimer.startTimer();
      this.isRendering = true;
      this.posts = data;
    });
  }

  runDeletePostBenchmark = async () => {
    await this.spinner.show('json-placeholder-benchmark');
    const postId = Math.floor(Math.random() * 100) + 1;
    this.deletePost(postId).pipe(
      repeat(this.BENCHMARKS_NUMBER),
      finalize(() => this.spinner.hide('json-placeholder-benchmark'))
    ).subscribe();
  }

  clear(): void {
    window.location.reload();
  }
}
