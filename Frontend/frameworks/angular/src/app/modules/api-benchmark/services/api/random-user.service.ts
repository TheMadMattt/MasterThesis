import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {User} from '@modules/api-benchmark/models/User';

@Injectable({
  providedIn: 'root'
})
export class RandomUserService {
  private readonly RANDOM_USERS_API_URL: string = 'https://randomuser.me/api/?results=';

  constructor(private httpClient: HttpClient) { }

  getUsers(count: number): Observable<User[]> {
    return this.httpClient.get<User[]>(this.RANDOM_USERS_API_URL + `${count}`).pipe(
      map((data: any) => data.results)
    );
  }
}
