import { Injectable } from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Post, Comment} from '@modules/api-benchmark/models/Post';
import {Album, Photo} from '@modules/api-benchmark/models/Album';
import {PostDTO} from '@modules/api-benchmark/models/DTOs/PostDTO';

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceholderService {
  private readonly API_URL: string = 'https://jsonplaceholder.typicode.com/';

  constructor(private httpClient: HttpClient) { }

  getAlbums(): Observable<Album[]> {
    return this.httpClient.get<Album[]>(this.API_URL + 'albums');
  }

  getPhotos(): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.API_URL + 'photos');
  }

  createNewPost(post: PostDTO): Observable<Post> {
    return this.httpClient.post<Post>(this.API_URL + 'posts', post);
  }

  getPost(id: number): Observable<Post> {
    return this.httpClient.get<Post>(this.API_URL + 'posts/' + id);
  }

  updatePost(post: Post): Observable<Post> {
    return this.httpClient.put<Post>(this.API_URL + 'posts/' + post.id, post);
  }

  deletePost(id: number): Observable<Post> {
    return this.httpClient.delete<Post>(this.API_URL + 'posts/' + id);
  }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.API_URL + 'posts');
  }

  getComments(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.API_URL + 'comments');
  }

  getCommentsForPost(postId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.API_URL + 'comments?postId=' + postId);
  }

  getPostWithComments(postId: number): Observable<Post> {
    return forkJoin({post: this.getPost(postId), comments: this.getCommentsForPost(postId)}).pipe(
      map(data => {
        data.post.comments = data.comments;
        return data.post;
      })
    );
  }

  getPostsWithComments(): Observable<Post[]> {
    return forkJoin({posts: this.getPosts(), comments: this.getComments()}).pipe(
      map(data => {
        data.posts.map(post => {
          post.comments = data.comments.filter(comment => comment.postId === post.id);
          return post;
        });
        return data.posts;
      })
    );
  }
}
