import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {ToDo} from '@modules/benchmarks/models/ToDo';
import {Album, Photo} from '@modules/benchmarks/models/Album';
import {map} from 'rxjs/operators';
import {User} from '@modules/benchmarks/models/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL: string = 'https://jsonplaceholder.typicode.com/';
  private readonly LOCAL_API_URL: string = 'https://localhost:44389/';
  private readonly RANDOM_USERS_API_URL: string = 'https://randomuser.me/api/?results=';

  constructor(private httpClient: HttpClient) { }

  getAlbums(): Observable<Album[]> {
    return this.httpClient.get<Album[]>(this.API_URL + 'albums');
  }

  getPhotos(): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.API_URL + 'photos');
  }

  getAlbumsWithPhotos(): Observable<Album[]> {
    return forkJoin({albums: this.getAlbums(), photos: this.getPhotos()}).pipe(
      map(data => {
        data.albums.map(album => {
          album.photos = data.photos.filter(photo => photo.albumId === album.id);
          return album;
        });
        return data.albums;
      })
    );
  }

  getUsers(count: number): Observable<User[]> {
    return this.httpClient.get<User[]>(this.RANDOM_USERS_API_URL + `${count}`).pipe(
      map((data: any) => data.results)
    );
  }

  getToDos(): Observable<ToDo[]> {
    return this.httpClient.get<ToDo[]>(this.API_URL + 'todos');
  }

  getListOfStringsLocal(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.LOCAL_API_URL + 'WeatherForecast');
  }
}
