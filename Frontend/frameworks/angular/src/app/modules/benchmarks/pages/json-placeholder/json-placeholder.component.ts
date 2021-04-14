import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {Timer} from '@modules/benchmarks/timer';
import {JsonPlaceholderService} from '@modules/benchmarks/services/api/json-placeholder.service';
import {finalize, map, switchMap, take} from 'rxjs/operators';
import {Post} from '@modules/benchmarks/models/Post';
import {DialogService} from '@modules/benchmarks/services/dialog.service';
import {PostDTO} from '@modules/benchmarks/models/DTOs/PostDTO';
import {FormControl} from '@angular/forms';
import {EMPTY} from 'rxjs';

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
  renderTimer = new Timer('render');
  isRendering = false;
  constructor(private jsonPlaceholderApi: JsonPlaceholderService,
              private cdr: ChangeDetectorRef,
              private dialogService: DialogService) { }

  ngAfterViewChecked(): void {
    if (this.isRendering) {
      this.renderTimer.stopTimer();
      this.isRendering = false;
      this.cdr.detectChanges();
    }
  }

  getPostsWithComments(): void {
    this.getPostsTimer.startTimer();
    this.jsonPlaceholderApi.getPostsWithComments().pipe(
      take(1),
      finalize(() => this.getPostsTimer.stopTimer())
    ).subscribe(data => {
      this.isRendering = true;
      this.renderTimer.startTimer();
      this.posts = data;
    });
  }

  addPost(): void {
    this.dialogService.openPostForm(new Post()).pipe(
      map((result: any) => result?.post),
      take(1),
      switchMap((post: PostDTO) => {
        if (post) {
          this.addPostTimer.startTimer();
          return this.jsonPlaceholderApi.createNewPost(post);
        } else {
          return EMPTY;
        }
      }),
      finalize(() => this.addPostTimer.stopTimer())
    ).subscribe();
  }

  editPost(post: Post): void {
    this.dialogService.openPostForm(post).pipe(
      map((result: any) => result?.post),
      take(1),
      switchMap((updatedPost: Post) => {
        if (updatedPost) {
          this.updatePostTimer.startTimer();
          return this.jsonPlaceholderApi.updatePost(updatedPost);
        } else {
          return EMPTY;
        }
      }),
      finalize(() => this.updatePostTimer.stopTimer())
    ).subscribe();
  }

  deletePost(postId: number): void {
    this.deletePostTimer.startTimer();
    this.jsonPlaceholderApi.deletePost(postId).pipe(
      take(1),
      finalize(() => this.deletePostTimer.stopTimer())
    ).subscribe();
  }

  getPost(postId: number): void {
    if (postId > 0 && postId <= 100) {
      this.getPostTimer.startTimer();
      this.jsonPlaceholderApi.getPost(postId).pipe(
        take(1),
        finalize(() => this.getPostTimer.stopTimer())
      ).subscribe((post: Post) => {
        this.renderTimer.startTimer();
        this.isRendering = true;
        this.selectedPost = post;
      });
    }
  }

  updatePost(postId: number): void {
    this.jsonPlaceholderApi.getPost(postId).pipe(
      take(1)
    ).subscribe(post => {
      this.editPost(post);
    });
  }

  clear(): void {
    this.posts = [];
    this.renderTimer.clear();
    this.getPostsTimer.clear();
    this.addPostTimer.clear();
    this.updatePostTimer.clear();
    this.deletePostTimer.clear();
    this.getPostTimer.clear();
    this.isRendering = false;
    this.selectedPost = new Post();
  }
}
